// blog-post-1.jsx — "Performer (FAVOR+) Attention — Derivation Notes"
const TeX = window.TeX;

function PerformerAttentionPost() {
  return (
    <div className="post-prose">
      <h2>1. The problem</h2>
      <p>Standard self-attention is</p>
      <TeX block tex={"\\text{Att}(Q,K,V) = D^{-1}(QK^\\top)V, \\qquad D = \\text{diag}(QK^\\top \\mathbf{1}_L)"} />
      <p>Computing <TeX tex={"QK^\\top"} /> materializes an <TeX tex={"L \\times L"} /> matrix — <TeX tex={"O(L^2)"} /> time and memory. For scBERT, <TeX tex={"L \\approx 16{,}906"} /> genes, which makes the exact form impractical. Performer's fix: never build that matrix.</p>

      <h2>2. The core identity</h2>
      <p>For a fixed vector <TeX tex={"x"} /> and <TeX tex={"w \\sim \\mathcal{N}(0, I_d)"} />:</p>
      <div className="eq-row">
        <TeX block tex={"\\mathbb{E}_w[\\exp(w^\\top x)] = \\exp\\left(\\frac{|x|^2}{2}\\right)"} />
        <span className="eq-tag">Gaussian MGF</span>
      </div>
      <p>Apply it to <TeX tex={"x = q+k"} />, and expand <TeX tex={"|q+k|^2 = |q|^2 + 2q\\cdot k + |k|^2"} />:</p>
      <TeX block tex={"\\mathbb{E}_w[\\exp(w^\\top q)\\exp(w^\\top k)] = \\exp\\left(\\frac{|q|^2}{2}\\right)\\exp\\left(\\frac{|k|^2}{2}\\right)\\exp(q\\cdot k)"} />
      <p>Define the <strong>random feature map</strong>:</p>
      <TeX block tex={"\\varphi_w(x) \\;=\\; \\exp\\left(w^\\top x - \\frac{|x|^2}{2}\\right)"} />
      <p>Substituting and rearranging gives the identity everything rests on:</p>
      <TeX block tex={"\\boxed{\\;\\mathbb{E}_w\\big[\\varphi_w(q)\\,\\varphi_w(k)\\big] = \\exp(q\\cdot k)\\;}"} />
      <p>A random projection turns the multiplicative kernel <TeX tex={"\\exp(q \\cdot k)"} /> into an expectation of a product of two <em>separately computable</em> functions — one that only touches <TeX tex={"q"} />, one that only touches <TeX tex={"k"} />.</p>
      <div className="callout">
        <p><strong>Non-negotiable requirement:</strong> the <em>same</em> draw of <TeX tex={"w"} /> must be used inside both <TeX tex={"\\varphi_w(q)"} /> and <TeX tex={"\\varphi_w(k)"} />. That's what lets <TeX tex={"\\exp(w^\\top q)\\exp(w^\\top k)"} /> collapse into <TeX tex={"\\exp(w^\\top(q+k))"} /> in the first place. Use two independent draws instead, and since <TeX tex={"\\mathbb{E}_w[\\varphi_w(x)] = 1"} /> for any <TeX tex={"x"} />, the whole thing collapses to <TeX tex={"1 \\times 1 = 1"} /> — not <TeX tex={"\\exp(q\\cdot k)"} />. (Confirmed by breaking it exactly this way in testing.)</p>
      </div>

      <h2>3. From one pair to a full attention layer</h2>
      <p>Draw <TeX tex={"m"} /> random vectors <TeX tex={"w_1, ..., w_m"} /> once, and stack:</p>
      <TeX block tex={"\\varphi(x) = \\frac{1}{\\sqrt{m}}\\big[\\varphi_{w_1}(x), \\dots, \\varphi_{w_m}(x)\\big] \\in \\mathbb{R}^m"} />
      <p><TeX tex={"\\varphi(q)\\cdot\\varphi(k)"} /> is now a Monte Carlo estimate of <TeX tex={"\\exp(q\\cdot k)"} /> that sharpens as <TeX tex={"m"} /> grows. Substituting into (unnormalized) attention:</p>
      <TeX block tex={"\\sum_j \\exp(q_l\\cdot k_j)\\,v_j \\;\\approx\\; \\sum_j \\big[\\varphi(q_l)\\cdot\\varphi(k_j)\\big]\\,v_j = \\varphi(q_l)\\cdot\\underbrace{\\left(\\sum_j \\varphi(k_j)\\,v_j^\\top\\right)}_{\\textbf{compute once, } O(L)}"} />
      <p>Formally, with <TeX tex={"Q' = \\varphi(Q)"} />, <TeX tex={"K' = \\varphi(K)"} /> (applied row-wise):</p>
      <TeX block tex={"\\widehat{\\text{Att}}(Q,K,V) = \\hat D^{-1}\\Big(Q'\\big((K')^\\top V\\big)\\Big), \\qquad \\hat D = \\text{diag}\\Big(Q'\\big((K')^\\top \\mathbf{1}_L\\big)\\Big)"} />
      <p>The parenthesized term <TeX tex={"(K')^\\top V"} /> doesn't depend on the query position — computed once for the whole sequence, in <TeX tex={"O(L)"} />, then every query does one small matmul against it. The <TeX tex={"L\\times L"} /> matrix never gets built.</p>

      <h2>4. A real caveat: variance scales with |q+k|²</h2>
      <p><TeX tex={"\\varphi_w(q)\\varphi_w(k) = \\exp\\big(w^\\top(q+k) - \\tfrac{|q|^2+|k|^2}{2}\\big)"} /> is lognormal in <TeX tex={"w^\\top(q+k)"} />, so its variance blows up with <TeX tex={"|q+k|^2"} />. Large raw <TeX tex={"q,k"} /> need an enormous <TeX tex={"m"} /> to converge cleanly; keeping them at a small, controlled scale (e.g. post-LayerNorm magnitude) converges fast. This is why production Performer implementations rescale <TeX tex={"Q,K"} /> before applying <TeX tex={"\\varphi"} />.</p>

      <h2>5. Numerical verification (summary)</h2>
      <table className="post-table">
        <thead><tr><th>Check</th><th>Result</th></tr></thead>
        <tbody>
          <tr><td>Single-pair estimator <TeX tex={"\\varphi(q)\\cdot\\varphi(k) \\to \\exp(q\\cdot k)"} /></td><td>error 0.024 → 0.002 as <TeX tex={"m: 1 \\to 16{,}384"} /></td></tr>
          <tr><td>Full attention output vs. exact softmax</td><td>mean abs. error 0.20 → 0.004 as <TeX tex={"m: 1 \\to 16{,}384"} /></td></tr>
          <tr><td>Wall-clock, exact softmax attention</td><td>1.5s at <TeX tex={"L=8{,}000"} /> (grows <TeX tex={"\\sim L^2"} />)</td></tr>
          <tr><td>Wall-clock, FAVOR+ linear attention</td><td>0.09s at <TeX tex={"L=16{,}906"} /> (scBERT's real gene count)</td></tr>
        </tbody>
      </table>

      <h2>6. scBERT's actual value of <TeX tex={"m"} /></h2>
      <p>The paper (Methods) defines <TeX tex={"m"} /> only symbolically — "<TeX tex={"m"} /> is the dimensionality of the matrix" — and never states a number. The hyperparameter sensitivity sweep (bins, embedding dim, heads, depth) doesn't test <TeX tex={"m"} /> either. It's absent from the paper.</p>
      <p>The training code (<code>pretrain.py</code>/<code>finetune.py</code>) doesn't set it explicitly:</p>
      <pre><code>{"model = PerformerLM(num_tokens=CLASS, dim=200, depth=6,\n                     max_seq_len=SEQ_LEN, heads=10,\n                     local_attn_heads=0, g2v_position_emb=POS_EMBED_USING)"}</code></pre>
      <p>The underlying <code>performer_pytorch</code> library falls back to a default:</p>
      <TeX block tex={"m = \\left\\lfloor d_{\\text{head}} \\cdot \\ln(d_{\\text{head}}) \\right\\rfloor, \\qquad d_{\\text{head}} = \\frac{\\dim}{\\text{heads}}"} />
      <p>With scBERT's <TeX tex={"\\dim=200"} />, <TeX tex={"\\text{heads}=10"} />: <TeX tex={"d_{\\text{head}} = 20"} />, so</p>
      <TeX block tex={"m = \\lfloor 20 \\cdot \\ln(20) \\rfloor = \\lfloor 59.91 \\rfloor = \\mathbf{59}"} />
      <div className="callout">
        <p><strong>Not a chosen/reported value — an inherited library default</strong>, computed here from scBERT's own dim/heads settings rather than confirmed from their exact forked source. The headline number worth remembering: <strong>59 random features standing in for a sequence of ~16,906 genes.</strong></p>
      </div>

      <h2>References</h2>
      <ul className="post-refs">
        <li>Yang, F., Wang, W., Wang, F. et al. <a href="https://www.nature.com/articles/s42256-022-00534-z" target="_blank" rel="noopener">scBERT as a large-scale pretrained deep language model for cell type annotation of single-cell RNA-seq data</a>. <em>Nat Mach Intell</em> (2022).</li>
        <li><a href="https://github.com/TencentAILabHealthcare/scBERT" target="_blank" rel="noopener">TencentAILabHealthcare/scBERT</a> — official code repository.</li>
      </ul>
    </div>
  );
}

Object.assign(window, { PerformerAttentionPost });
