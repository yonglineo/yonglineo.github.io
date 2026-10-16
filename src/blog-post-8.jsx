// blog-post-8.jsx — "MATH 3012 Notes: Applied Combinatorics"
const TeX = window.TeX;

function MATH3012Post() {
  return (
    <div className="post-prose">
      <h2 id="sets-functions">Sets &amp; Functions</h2>
      <p><strong>Set</strong> = collection of elements, denoted by <TeX tex="\{\}" />. Note: unordered. You can define <TeX tex="\{x \mid \text{some condition for } x\}" />.</p>
      <p><strong>Empty set</strong> <TeX tex="= \{\} = \varnothing" />. <strong>Cardinality</strong> <TeX tex="(|S|)" /> = number of elements in a set.</p>
      <ul>
        <li><strong>Elements:</strong> <TeX tex="x \in S" /> if <TeX tex="x" /> is an element of <TeX tex="S" />.</li>
        <li><strong>Subsets:</strong> <TeX tex="A \subseteq S" /> if every element of <TeX tex="A" /> is in <TeX tex="S" />. <TeX tex="\subsetneq" /> denotes subset but <TeX tex="A \neq S" />; <TeX tex="\not\subset" /> denotes not a subset; <TeX tex="\subset" /> denotes proper subset.</li>
      </ul>
      <p><TeX tex="A = B" /> if and only if <TeX tex="A \subseteq B" /> and <TeX tex="B \subseteq A" />.</p>
      <p>The complement of subset <TeX tex="T \subseteq S" /> is the set of all elements in <TeX tex="S" /> that are not in <TeX tex="T" /> (<TeX tex="T^c = \overline T = S\setminus T" />).</p>
      <p><TeX tex="S \cup T = \{x \mid x\in S \text{ or } x\in T\}" />, <TeX tex="S \cap T = \{x \mid x\in S \text{ and } x\in T\}" />. Disjoint if <TeX tex="S\cap T = \varnothing" />.</p>
      <p>A <strong>sequence</strong> is an indexed collection of objects in which repetition is allowed and order matters. Note that they are 0-indexed. E.g. <TeX tex="(1)_{n\geq0} = (1,1,1,\dots)" />, <TeX tex="(n+1)_{n\geq0} = (1,2,3,\dots)" />.</p>
      <p>Let <TeX tex="X" /> be a set. An <TeX tex="X" />-string of length <TeX tex="n" /> is an ordered sequence of objects in <TeX tex="X" />. If <TeX tex="X=\{0,1\}" />, any <TeX tex="X" />-string = binary string, e.g. <code>1010110</code>.</p>
      <p>Let <TeX tex="X, Y" /> be sets. An unordered pair <TeX tex="(x,y)" /> assigns/maps an element <TeX tex="x\in X" /> to <TeX tex="y\in Y" />. We call <TeX tex="y" /> the <em>image</em> of <TeX tex="x" />.</p>
      <p>A function <TeX tex="f: X\to Y" /> is a set of unordered pairs <TeX tex="(x,y)" /> — each <TeX tex="x \in X" /> is contained in exactly 1 pair in <TeX tex="f" />. E.g. <TeX tex="f:\mathbb{R}\to\mathbb{R}" /> s.t. <TeX tex="f(x)=x^2 \Rightarrow f = \{(x,x^2)\mid x\in\mathbb{R}\}" />.</p>
      <p>Let <TeX tex="f" /> = function <TeX tex="X\to Y" />. <TeX tex="X" /> = domain of <TeX tex="f" />, <TeX tex="Y" /> = codomain of <TeX tex="f" />. Range of <TeX tex="f = \{y\in Y \mid (x,y)\in f \;\exists x\in X\}" />.</p>
      <ul>
        <li><strong>Injective</strong> = one-to-one ⇒ doesn't appear twice in range (<TeX tex="|X|\leq|Y|" />).</li>
        <li><strong>Surjective</strong> (onto) ⇒ codomain = range of <TeX tex="f" /> ⇒ everything is reachable (<TeX tex="|X|\geq|Y|" />).</li>
        <li><strong>Bijection</strong> = injective &amp; surjective — that means it's invertible.</li>
      </ul>
      <p>E.g. <TeX tex="f:\mathbb{N}\to\mathbb{Z}, f(x)=x" /> mapped via <TeX tex="0,1,2,\dots \to 0,-1,1,-2,2,\dots" /> is injective &amp; surjective. <TeX tex="f:\mathbb{Z}\to\mathbb{N}, f(x) = 2x \text{ if } x\geq0,\; -2x-1 \text{ if } x<0" />.</p>
      <h3>Pigeonhole Principle</h3>
      <p><TeX tex="n" /> pigeons in <TeX tex="k" /> pigeonholes — you have at least 1 hole with <TeX tex="\lceil n/k \rceil" /> elements. E.g. 5 points in a 2×2 square: distance <TeX tex="\leq \sqrt2" /> between two of them.</p>
      <h3>How to Show <TeX tex="f" /> is a Bijection</h3>
      <ol>
        <li>Show that <TeX tex="f" /> is injective &amp; surjective.
          <ul>
            <li>(1a) for <TeX tex="\forall x,y" />, if <TeX tex="x\neq y" />, <TeX tex="f(x)\neq f(y)" /> — or, contrapositive: if <TeX tex="f(x)=f(y)" />, then <TeX tex="x=y" />.</li>
            <li>(1b) for all <TeX tex="y\in Y" />, <TeX tex="\exists x \text{ s.t. } f(x)=y" />.</li>
          </ul>
        </li>
        <li>Show <TeX tex="g: Y\to X" /> s.t. <TeX tex="g=f^{-1}" />: show that <TeX tex="f(g(y))=y" /> and <TeX tex="g(f(x))=x" />.</li>
      </ol>
      <p>e.g. <TeX tex="P_n" /> = arrangements of valid parentheses; <TeX tex="L_n" /> = increasing sequences from <TeX tex="(0,0)" /> to <TeX tex="(n,n)" /> staying below the diagonal.</p>
      <h3>Recursion</h3>
      <p>Fibonacci: <TeX tex="F = (0,1,1,2,3,5,8,13,\dots)" />, <TeX tex="F_0=0, F_1=1, F_n = F_{n-1}+F_{n-2}" /> — can be used to calculate "tiling" DP.</p>

      <h2 id="induction-counting">Induction &amp; Counting Rules</h2>
      <p>Let <TeX tex="S_n" /> = a statement that depends only on the value of <TeX tex="n" /> and is always T/F.</p>
      <ol>
        <li><strong>Base case:</strong> <TeX tex="S_{n_0}, S_{n_0+1}, \dots, S_{n_1}" /> are true.</li>
        <li><strong>Inductive step:</strong> <TeX tex="S_{n_0}, S_{n_0+1}, \dots, S_k" /> implies <TeX tex="S_{k+1}" /> (can write for <TeX tex="k\leq m" />) for any <TeX tex="k\in\mathbb{Z}_{\geq0}" />.</li>
      </ol>
      <p>Then <TeX tex="S_n" /> is true for all <TeX tex="n\geq n_0" />.</p>
      <p><strong>The Sum Rule:</strong> if <TeX tex="A" /> and <TeX tex="B" /> cannot happen simultaneously, and they can happen in <TeX tex="n" /> and <TeX tex="k" /> ways respectively, then <TeX tex="A\cup B = n+k" /> ways.</p>
      <p><strong>The Product Rule:</strong> <TeX tex="A" /> in <TeX tex="n" /> ways, and in each way <TeX tex="B" /> has <TeX tex="k" /> ways: <TeX tex="A\cap B = nk" /> ways.</p>
      <p>Let <TeX tex="X" /> be a set with <TeX tex="|X|=n" />. There are <TeX tex="n^r" /> <TeX tex="X" />-strings of length <TeX tex="r" />.</p>
      <p>A <strong>permutation</strong> is a possible arrangement (ordering) of a collection of objects — if all objects belong to a set <TeX tex="X" />, we call it an <TeX tex="X" />-permutation.</p>
      <p>There are <TeX tex="n!" /> permutations of <TeX tex="n" /> distinct objects. For any set <TeX tex="X" />, there are <TeX tex="n!" /> strings of size <TeX tex="n" /> that contain no repeated symbols.</p>
      <p><strong>Theorem</strong> (permutations of size <TeX tex="k" /> with <TeX tex="n" /> objects): <TeX tex="P(n,k) = \dfrac{n!}{(n-k)!}" /></p>
      <p>Idea: take the first <TeX tex="k" /> (order matters) then the remaining <TeX tex="n-k" /> (order doesn't matter — we recounted <TeX tex="(n-k)!" /> times each).</p>
      <p>For a round table: <TeX tex="(n-1)!" />, because <TeX tex="n" /> rotations are overcounted. E.g. 3 red, 3 blue, alternating around a circle of 6 seats: total <TeX tex="= \dfrac{6\cdot3\cdot2\cdot2}{6} = 12" /> ways (6 rotations).</p>

      <h2 id="combinations-binomial">Combinations &amp; the Binomial Theorem</h2>
      <p>A <strong>combination</strong> is a subset of <TeX tex="k" /> objects selected from set <TeX tex="X" />, <TeX tex="|X|=n" />.</p>
      <TeX block tex="C(n,k) = \frac{n!}{(n-k)!k!}" />
      <p>1. <TeX tex="\binom{n}{k} = \binom{n}{n-k}" />&nbsp;&nbsp;2. <TeX tex="\binom{n}{k}+\binom{n}{k+1} = \binom{n+1}{k+1}" /></p>
      <h3>Combinatorial Proof</h3>
      <p>Counts the same set of objects in 2 different ways, proving the numbers obtained are equal.</p>
      <ol>
        <li><TeX tex="\binom{2n}{2} = 2\binom{n}{2} + n^2" /> — split into two groups of <TeX tex="n" />: (1) both from group 1, (2) both from group 2, (3) one from each.</li>
        <li><TeX tex="\sum_{k=0}^{n}\binom{n}{k} = 2^n" /> — consider bit-strings of length <TeX tex="n" />; each <TeX tex="k" /> says we have <TeX tex="k" /> bits set to 1, so <TeX tex="2^n" /> bit-strings total for <TeX tex="k" /> from 0 to <TeX tex="n" />.</li>
        <li><TeX tex="\binom{n}{k}+\binom{n}{k+1} = \binom{n+1}{k+1}" /> — for <TeX tex="n" /> objects, either choose "this" (leaves <TeX tex="k-1" /> to pick) or don't choose "this" (leaves <TeX tex="k" /> to pick, out of the remaining <TeX tex="n" />).</li>
        <li><TeX tex="\sum_{k=0}^n k\binom{n}{k} = n\cdot2^{n-1}" /> — we want a leader from <TeX tex="\binom{n}{k}" />: choose <TeX tex="k" /> people from <TeX tex="n" /> to form a group, then choose a leader from that group. Reverse: choose one leader first, then everyone else can/cannot be in the group.</li>
        <li><TeX tex="\sum_{k=0}^m \binom{m}{k}^2 = \sum_{k=0}^m \binom{m}{k}\binom{m}{m-k} = \binom{2m}{m}" /> — two boxes of <TeX tex="m" /> each; choose <TeX tex="k" /> from box 1 and <TeX tex="m-k" /> from box 2, total <TeX tex="m" /> chosen. We have <TeX tex="2m" /> people split into 2 groups, choosing the same total number from both groups to form a community.</li>
      </ol>
      <p>A collection of size <TeX tex="n" /> with <TeX tex="n_i" /> objects of type <TeX tex="i" />, indistinguishable within type — there are <TeX tex="\dfrac{n!}{\prod(n_i!)} = \dfrac{n!}{n_1!n_2!n_3!\cdots}" />. E.g. permutations of length 6 of "ATLANTA" (with A/T/L/N): sum over cases with 2A 2T 1L 1N, 3A 1T 1L 1N, 3A 2T 1L or 1N, etc.</p>
      <h3>Binomial Theorem</h3>
      <TeX block tex="(x+y)^n = \binom{n}{0}x^ny^0 + \binom{n}{1}x^{n-1}y^1 + \dots + \binom{n}{i}x^{n-i}y^i + \dots" />
      <p>E.g. coefficient of <TeX tex="x^6y^3" /> in <TeX tex="(3x^2+4y)^6" />: <TeX tex="\binom{6}{3}(3x^2)^3(4y)^3 = \dfrac{6!}{3!3!}\cdot3^3\cdot4^3" /></p>
      <p><TeX tex="(2x+3y+s)^{13}" />, find coefficient of <TeX tex="x^4y^7" />: <TeX tex="2^4\cdot3^7\cdot s^2\binom{13}{4}\binom{9}{7}\binom{2}{2}" /> (choosing which of the 13 factors give <TeX tex="x, y, s" /> in turn) — same result either grouping order.</p>
      <p><TeX tex="\binom{n}{n_1}\binom{n-n_1}{n_2}\cdots = \dfrac{n!}{n_1!n_2!\cdots}" />, called the multinomial coefficient <TeX tex="\binom{n}{n_1,n_2,\dots,n_k}" />.</p>

      <h2 id="stars-bars">Stars and Bars</h2>
      <p><TeX tex="x_1+x_2+x_3+\cdots+x_k = n" /> (<TeX tex="x_i\geq0" />), the total ways <TeX tex="= \binom{n+k-1}{k-1}" /> — think of <TeX tex="n" /> objects with <TeX tex="k-1" /> "dividers" placed among them.</p>
      <p>E.g. people can choose A, B, or C. (1) From the server's view we have <TeX tex="3^n" /> possibilities. (2) From the chef's view we only know the total number of items <TeX tex="=n" />: <TeX tex="A+B+C=n \Rightarrow \binom{n+3-1}{3-1} = \binom{n+2}{2}" />.</p>
      <p><TeX tex="x_1+x_2+x_3=9" />: (1) <TeX tex="x_1\geq0" />, (2) <TeX tex="0\leq x_2\leq7" />, (3) <TeX tex="x_3\geq0" /> → <TeX tex="\binom{9+3-1}{3-1} - \binom{1+3-1}{3-1}" /> (subtracting the case <TeX tex="x_2\geq8" />).</p>
      <p>Another example with bounds <TeX tex="x_1\geq1" />, <TeX tex="2\leq x_2\leq4" />, <TeX tex="1\leq x_3\leq4" /> for <TeX tex="y_1+y_2+y_3=5" />, <TeX tex="y_2\leq2" />, <TeX tex="y_3\leq3" />, using inclusion/exclusion over the two "too-large" cases (the double-violation case is impossible, so total <TeX tex="= \binom{5+3-1}{3-1} - \binom{2+3-1}{3-1} - \binom{1+3-1}{3-1} - 0 = 5-3=2" />.</p>

      <h2 id="pie">Inclusion-Exclusion Principle</h2>
      <p>Let <TeX tex="A" /> = set of all objects of a particular type — the <em>universal set</em>. For each <TeX tex="1\leq i\leq n" />, let <TeX tex="c_i" /> = condition of the <TeX tex="i" />-th step, and <TeX tex="A_i" /> = subset of <TeX tex="A" /> containing elements satisfying condition <TeX tex="c_i" /> (think of it as a "filter").</p>
      <p>Let <TeX tex="S_i" /> = sum of all cardinalities of sets of elements satisfying <em>at least</em> <TeX tex="i" /> conditions:</p>
      <p><TeX tex="|A_1|+|A_2|+|A_3|+\cdots = \sum_{i=1}^n|A_i| = S_1" /><br />
      <TeX tex="|A_1\cap A_2|+|A_1\cap A_3|+\cdots = \sum_{1\leq i,j\leq n}|A_i\cap A_j| = S_2" /></p>
      <p>Then the number of elements satisfying NONE of <TeX tex="c_1,\dots,c_n" /> is:</p>
      <TeX block tex="|(A_1\cup A_2\cup\cdots\cup A_n)^c| = |A| - S_1+S_2-S_3+\cdots = |A|+\sum_{i=1}^n(-1)^iS_i" />
      <p>E.g. to count surjections, let <TeX tex="c_i" /> = "does NOT contain <TeX tex="y_i" />". By PIE, the count containing all <TeX tex="y_i" /> is <TeX tex="|A| - \sum A_i + \sum|A_i\cap A_j| - \cdots + (-1)^n|A_1\cap A_2\cap\cdots\cap A_n|" />.</p>
      <p>Let <TeX tex="E_k" /> = number of elements of <TeX tex="A" /> satisfying <em>exactly</em> <TeX tex="k" /> conditions. <TeX tex="E_0 = |(A_1\cup A_2\cup\cdots)^c|" />.</p>
      <p><TeX tex="E_1 = S_1-2S_2+3S_3" />, <TeX tex="E_2 = S_2-3S_3" />, <TeX tex="E_3=S_3" />. In general:</p>
      <TeX block tex="E_k = S_k - \binom{k+1}{1}S_{k+1} + \binom{k+2}{2}S_{k+2} - \cdots = \sum_{i=k}^n (-1)^{i-k}\binom{i}{i-k}S_i" />
      <p>Worked example: let <TeX tex="Y=\{A,B\}" />, <TeX tex="X=\{1,2,3\}" />, number of ways <TeX tex="= |S|-|A|-|B|+|A\cap B| = 2^3-1-1+0" /> (A not covered, all B — A and B both not covered is impossible).</p>
      <p><TeX tex="|(A_1\cup A_2\cup A_3)^c| = |S|-|A_1|-|A_2|-|A_3|+|A_1\cap A_2|+|A_2\cap A_3|+|A_1\cap A_3|-|A_1\cap A_2\cap A_3|" /></p>

      <h2 id="derangements-rooks">Derangements &amp; Rook Polynomials</h2>
      <p><strong>Derangements</strong> = give 10 exams to students such that NONE received their own exam.</p>
      <p><TeX tex="X=\{1,2,\dots,n\}" />, <TeX tex="A=\{f: X\to X \mid f \text{ is a bijection}\}" />, define <TeX tex="c_i" /> to be the condition <TeX tex="f(i)=i" /> (giving <TeX tex="|A|-|A_i|+|A_i\cap A_j|-\cdots" />). Functions <TeX tex="f\in A" /> avoiding all <TeX tex="c_i" /> are called derangements.</p>
      <TeX block tex="!n = n! - \binom{n}{1}(n-1)! + \binom{n}{2}(n-2)! - \cdots" />
      <p><TeX tex="!n = n!\sum_{i=0}^n \dfrac{(-1)^i}{i!} \approx n!\,e^{-1} = \dfrac{n!}{e}" /> (since <TeX tex="e^x = \sum \tfrac{x^i}{i!}" />, so <TeX tex="e^{-1}\approx\sum(-1)^i\tfrac{1}{i!}" />).</p>
      <p><strong>Theorem:</strong> <TeX tex="!n" /> = nearest integer to <TeX tex="n!/e" />.</p>
      <p>E.g. 10 people don't get their exams: <TeX tex="!10 = \lfloor 10!/e \rceil" />. Exactly 6 got their exams: <TeX tex="\binom{10}{4}\cdot{!4}" />. <TeX tex="n" /> couples swap after each song (3 songs); remark (2 songs): <TeX tex="!n/n!" />.</p>
      <h3>Rook Arrangement</h3>
      <p>Place <TeX tex="k" /> identical rooks on an <TeX tex="n\times m" /> chessboard <TeX tex="C" />. Let <TeX tex="r_k(C)" /> = number of positions (no two attacking). <TeX tex="r_0(C)=1" />, <TeX tex="r_1(C)=nm" />, <TeX tex="r_2(C)=(n-1)(m-1)" />.</p>
      <TeX block tex="r_k(C) = 0 \text{ if } k>\min(n,m), \quad \frac{1}{k!}\prod_{i=0}^{k}(n-i)(m-i) = \binom{n}{k}\binom{m}{k}k!" />
      <p>For a board split into independent blocks <TeX tex="C_1, C_2" />: <TeX tex="r_n(C_3) = \sum_{i+j=n} r_i(C_1)\cdot r_j(C_2)" /> — this looks like polynomial multiplication! Let <TeX tex="r(C,x)" /> = the <strong>rook polynomial</strong>, s.t. <TeX tex="r_k(C)" /> is the coefficient of <TeX tex="x^k" />. E.g. <TeX tex="r(C_1,x) = 1+9x+18x^2+6x^3" />.</p>
      <TeX block tex="r(C,x) = \prod_{i=0}^n r(C_i,x)" />
      <p>Swapping two rows/columns doesn't change the answer — this step can be repeated.</p>
      <p><strong>Find a problem…</strong> note that PIE could also be used: <TeX tex="A" /> = all seating arrangements, <TeX tex="c_i" /> = "person <TeX tex="i" /> is in a bad seat" (consider this as a sequence, column = person).</p>
      <p><TeX tex="|(A_1\cup\cdots\cup A_n)^c| = 6! - r_1(\bar C)\cdot5! + r_2(\bar C)\cdot4! - \cdots" /> (others can permute; how to place one rook). For a staircase-shaped "bad" region, <TeX tex="r(\bar C,x) = (1+4x+2x^2)(1+x)^3 = 1+7x+17x^2+19x^3+10x^4+2x^5" />.</p>

      <h2 id="generating-functions">Generating Functions</h2>
      <p>An <strong>ordinary generating function</strong> (OGF) encodes the terms of a sequence <TeX tex="(S_n)_{n\geq0}" /> as the coefficients of <TeX tex="x^n" /> for <TeX tex="n\geq0" />. OGF of <TeX tex="(S_n)_{n\geq0}" /> is <TeX tex="f(x) = \sum_{n=0}^\infty S_nx^n" />.</p>
      <p><TeX tex="\langle1,1,1,1,\dots\rangle = \dfrac{1}{1-x}" /></p>
      <p>E.g. <TeX tex="a+b+c=10" />, <TeX tex="2\leq a\leq4" />, <TeX tex="3\leq b\leq5" />, <TeX tex="2\leq c\leq5" />: <TeX tex="(x^2+x^3+x^4)(x^3+x^4+x^5)(x^2+\cdots+x^5) = \sum S_nx^n" />, find the coefficient of <TeX tex="x^{10}" />.</p>
      <p><TeX tex="a_n = \langle1,2,3,4,\dots\rangle \Rightarrow F(x) = \sum(n+1)x^n = \sum nx^{n-1} = \sum(x^n)' = \left(\dfrac{1}{1-x}\right)' = \dfrac{1}{(1-x)^2}" /></p>
      <p><TeX tex="2a+3b+7c=n \Rightarrow (1+x^2+x^4+\cdots)(1+x^3+x^6+\cdots)(1+x^7+x^{14}+\cdots)" />; and <TeX tex="(1+x)^n = \sum\binom{n}{i}x^i = \langle\binom{n}{0},\binom{n}{1},\dots\rangle" />, <TeX tex="e^x = \sum\tfrac{x^i}{i!} = \langle\tfrac{1}{0!},\tfrac{1}{1!},\dots\rangle" />.</p>
      <p>E.g. Fibonacci sequence: <TeX tex="a_0=0, a_1=1, a_n=a_{n-1}+a_{n-2}" />.</p>
      <p><TeX tex="F(x) = a_0+a_1x+a_2x^2+\cdots" /><br />
      <TeX tex="xF(x) = a_0x+a_1x^2+\cdots" /><br />
      <TeX tex="x^2F(x) = a_0x^2+a_1x^3+\cdots" /></p>
      <p><TeX tex="F(x) = xF(x)+x^2F(x)+a_0+(a_1-a_0)x = xF(x)+x^2F(x)+x" /></p>
      <h3>Manipulation Techniques</h3>
      <ol>
        <li>Multiply by a constant</li>
        <li>Multiply by <TeX tex="x" /> to shift right</li>
        <li>Take the derivative</li>
        <li>Substitution</li>
      </ol>
      <p>E.g. find the sequence of <TeX tex="\dfrac{2x}{(1-x)^2}" />: <TeX tex="\tfrac{1}{1-x} = \langle1,1,\dots\rangle" /> (definition); <TeX tex="\tfrac{1}{(1-x)^2} = \langle0,1,2,3,\dots\rangle" /> (derivative); <TeX tex="\tfrac{x}{(1-x)^2} = \langle0,0,1,2,3,\dots\rangle" /> (shift); <TeX tex="\tfrac{2x}{(1-x)^2} = \langle0,0,2,4,6,\dots\rangle" /> (scalar).</p>
      <p>Adding two generating functions: <TeX tex="\sum a_ix^i + \sum b_ix^i = \sum(a_i+b_i)x^i" />. Multiplying two OGFs: <TeX tex="\left(\sum a_ix^i\right)\left(\sum b_ix^i\right) = \sum_{i+j=k} a_ib_j x^k" />.</p>
      <p>E.g. <TeX tex="\langle1,1,1,\dots\rangle \times \langle1,-1,1,-1,\dots\rangle" />: <TeX tex="c_n = \sum a_ib_{n-i} = \sum(1)(-1)^i" />, which is 0 if <TeX tex="i" /> is odd, 1 if even — giving <TeX tex="c_n = \langle1,0,1,0,\dots\rangle" />.</p>

      <h2 id="partitions">Partitions</h2>
      <p><strong>Partition</strong> of <TeX tex="k" /> (<TeX tex="k\in\mathbb{Z}^+" />) is a grouping of <TeX tex="k" /> "ones" into positive unordered summands (parts). Denoted <TeX tex="P(k)" />, where <TeX tex="P_n(k)" /> = exactly <TeX tex="n" /> parts. E.g. <TeX tex="P(3) = \{3,\; 2{+}1,\; 1{+}1{+}1\}" />.</p>
      <p><TeX tex="P(k) = a_1\cdot1+a_2\cdot2+a_3\cdot3+\cdots" /> (how many <TeX tex="a_1" /> we choose):</p>
      <TeX block tex="k = (1+x+x^2+x^3+\cdots)(1+x^2+x^4+x^6+\cdots)(1+x^3+x^6+\cdots)\cdots = \frac1{1-x}\cdot\frac1{1-x^2}\cdot\frac1{1-x^3}\cdots" />
      <p><TeX tex="P(k)" /> of the OGF <TeX tex="= [x^k]" /> where <TeX tex="\text{OGF} = \prod_{i=1}^\infty \dfrac{1}{1-x^i}" />.</p>
      <p><strong>Ferrers diagram</strong> = show partitions using dots, arranged from largest to smallest. Note that "at most <TeX tex="n" /> parts" is the mirror of "parts with size <TeX tex="\leq n" />."</p>
      <p>Since we bound size <TeX tex="\leq n" />: OGF <TeX tex="= \prod_{i=1}^n \dfrac{1}{1-x^i}" />, and <TeX tex="P_{\leq n}(k)" /> = number of ways (if you bound it, use <TeX tex="\leq n" />). Notice <TeX tex="P_n(k) = P_{\leq n}(k-n)" /> (at most <TeX tex="n" /> groups ⇒ size <TeX tex="\leq n" /> — let row 1 have <TeX tex="n" /> dots, total <TeX tex="k-n" /> dots at most size <TeX tex="n" />).</p>
      <p>E.g. partition 14 into exactly 5 parts <TeX tex="= P_{\leq5}(14-5) = [x^9]" />. Similarly, sizes restricted to <TeX tex="S=\{x_1,x_2,x_3,\dots\}" />: <TeX tex="\prod_{s\in S}\dfrac{1}{1-x^s}" />.</p>
      <p><strong>Proposition 1:</strong> for <TeX tex="1+x+x^2+\cdots+x^n \Rightarrow \text{OGF} = \dfrac{1-x^{n+1}}{1-x}" />; generally <TeX tex="x^r+x^{r+1}+\cdots+x^h \Rightarrow \text{OGF} = \dfrac{x^r-x^{h+1}}{1-x}" />; for <TeX tex="1+x^i+x^{2i}+\cdots+x^{ni} \Rightarrow \text{OGF} = \dfrac{1-x^{(n+1)i}}{1-x^i}" />.</p>
      <p><strong>Proposition 2:</strong> if <TeX tex="(a_n)_{n\geq0}" /> and <TeX tex="(b_n)_{n\geq0}" /> are generated by the same OGF, <TeX tex="a_n=b_n" /> for all <TeX tex="n" />. Similarly, if <TeX tex="a_i=b_i" />, <TeX tex="\prod a_i = \prod b_i" />.</p>
      <p><strong>Proposition:</strong> for <TeX tex="n\in\mathbb{Z}" />, the number of partitions of <TeX tex="n" /> into odd parts equals the number of partitions into distinct parts. Intuitively, all numbers can be expressed as <TeX tex="2^n\cdot\text{odd number}" /> — for each even partition, put <TeX tex="2^n" /> copies of the odd number into the partition (e.g. <TeX tex="12=2^2\cdot3" />, so put four 3's).</p>
      <p>Formally, let <TeX tex="\text{OGF} = (1+x)(1+x^2)(1+x^3)\cdots = \left(\tfrac{1-x^2}{1-x}\right)\left(\tfrac{1-x^4}{1-x^2}\right)\left(\tfrac{1-x^6}{1-x^3}\right)\cdots = \dfrac{1-x^{\text{even}}}{1-x^{\text{all}}} = \dfrac{1}{1-x^{\text{odd}}}" /> <TeX tex="= \dfrac{1}{(1-x)(1-x^3)(1-x^5)\cdots} = (1+x+x^2+\cdots)(1+x^3+x^6+\cdots)\cdots" /> (how many 1's, how many 3's, ...).</p>

      <h2 id="graph-basics">Graph Theory Basics</h2>
      <p><strong>Loop</strong> = edge from itself to itself. <strong>Isolated</strong> = no incident edges. <strong>Multigraph</strong> = edges could duplicate.</p>
      <TeX block tex="\sum_{v\in V}\deg(v) = 2|E|" />
      <p><TeX tex="P_n" /> = path graph, <TeX tex="C_n" /> = cycle graph, <TeX tex="K_n" /> = complete graph.</p>
      <p>Let <TeX tex="G_1=(V_1,E_1)" /> and <TeX tex="G_2=(V_2,E_2)" />. <TeX tex="f: V_1\to V_2" /> is a <strong>graph isomorphism</strong> if (1) <TeX tex="f" /> is a bijection, and (2) <TeX tex="uv\in E_1" /> if and only if <TeX tex="\{f(u),f(v)\}\in E_2" /> (then <TeX tex="G_1\cong G_2" />, isomorphic).</p>
      <p>Features: 1. <TeX tex="|V_1|=|V_2|" />, <TeX tex="|E_1|=|E_2|" />. 2. <TeX tex="T\in G_1 \Leftrightarrow T\in G_2" />. 3. <TeX tex="\deg(u) = \deg(f(u))" />.</p>
      <p>A <strong>walk</strong> <TeX tex="=(v_0,e_1,v_1,e_2,\dots,e_n,v_n)" />, length of walk = number of edges. A walk is open if <TeX tex="v_0\neq v_n" /> and closed if <TeX tex="v_0=v_n" />.</p>
      <table className="post-table">
        <thead><tr><th>Repeat vertices</th><th>Repeat edges</th><th>Open</th><th>Closed</th></tr></thead>
        <tbody>
          <tr><td>Yes</td><td>Yes</td><td>open walk</td><td>closed walk</td></tr>
          <tr><td>Yes</td><td>No</td><td>trail</td><td>circuit</td></tr>
          <tr><td>No</td><td>No</td><td>path</td><td>cycle</td></tr>
        </tbody>
      </table>
      <p><strong>Euler circuit</strong> exists iff <TeX tex="G" /> is connected &amp; every vertex has even degree. <strong>Euler trail</strong> iff exactly two vertices have odd degree.</p>

      <h2 id="trees-planar">Trees &amp; Planar Graphs</h2>
      <p>Number of ways to label: <TeX tex="K_n=1" />, <TeX tex="P_n=\dfrac{n!}{2}" />, <TeX tex="C_n=\dfrac{(n-1)!}{2}" />, and <TeX tex="T_n = n^{n-2}" /> (<strong>Cayley's Theorem</strong>).</p>
      <p><span style={{color:"var(--signal-4)", fontWeight: 600}}>Will come out in finals:</span></p>
      <ol>
        <li>Start with the lowest label that is a leaf.</li>
        <li>Delete it and add its parent to the sequence.</li>
      </ol>
      <p>There is a bijection between the set of unrooted labeled trees with strings of length <TeX tex="n-2" /> using <TeX tex="1,\dots,n" /> — proven using Prüfer sequences/code.</p>
      <p>A graph <TeX tex="(V,E)" /> is <strong>planar</strong> if it can be drawn so that no edges intersect. For it to be planar, <TeX tex="V-e+r=2" /> with <TeX tex="r" /> = number of regions of the planar graph (remember the outside also counts for <TeX tex="r" />).</p>
      <h3>Elementary Subdivision</h3>
      <p>Operation: replace an edge and connect those endpoints to a new vertex (e.g. <TeX tex="C_n\to C_{n+1}" />). <strong>Homeomorphic</strong> means two graphs can be obtained from the same "loop-free" graph using the same graph (via subdivisions). Note: <TeX tex="P_n, C_n" /> are all homeomorphisms.</p>
      <p><strong>Theorem:</strong> if two graphs <TeX tex="G_1" /> &amp; <TeX tex="G_2" /> are homeomorphic, then they are either both planar or both nonplanar.</p>
      <p><strong>Theorem:</strong> <TeX tex="G" /> is nonplanar if it contains a subgraph <TeX tex="G'" /> s.t. <TeX tex="G'" /> is homeomorphic to <TeX tex="K_5" /> or <TeX tex="K_{3,3}" />.</p>

      <h2 id="coloring">Graph Coloring &amp; the Chromatic Polynomial</h2>
      <h3>4-Color Theorem</h3>
      <p><strong>Planar dual graph</strong> <TeX tex="G^d" /> of a planar graph or multigraph <TeX tex="G" /> is obtained by considering each region = vertex, &amp; edges to express neighboring regions.</p>
      <p><strong>Color:</strong> let <TeX tex="f" /> be a coloring function s.t. <TeX tex="f(u)\neq f(v)" /> for all <TeX tex="(u,v)\in E" />. If we only use colors <TeX tex="\{1,\dots,k\}" />, then <TeX tex="G" /> is <TeX tex="k" />-colorable. Note that <TeX tex="G=(V,E)" /> is always colorable (with enough colors).</p>
      <p>Let <TeX tex="\chi(G)" /> = min <TeX tex="k" /> s.t. <TeX tex="G" /> is <TeX tex="k" />-colorable — in other words, prove <TeX tex="\chi(G)" /> is not <TeX tex="(k-1)" />-colorable.</p>
      <p><TeX tex="\chi(K_n)=n" />; if <TeX tex="|E|=0" />, <TeX tex="\chi(G)=1" />; <TeX tex="\chi(P_n)=2" />.</p>
      <h3>Chromatic Polynomial</h3>
      <p>Consider a coloring s.t. no neighboring vertices have the same color. (1) Given <TeX tex="G" />, what is the smallest <TeX tex="k" /> s.t. <TeX tex="G" /> is <TeX tex="k" />-colorable? (2) If <TeX tex="G" /> is <TeX tex="k" />-colorable, how many ways?</p>
      <p>Consider <TeX tex="\lambda" /> = currently available colors. Graph with no edges <TeX tex="= \lambda^n" />. Path: <TeX tex="\lambda(\lambda-1)^{n-1}" />. For a random graph, something like: simple graph <TeX tex="\lambda(\lambda-m_1)(\lambda-m_2)\cdots" />.</p>
      <p>Let <TeX tex="P(G,\lambda)" /> = number of proper <TeX tex="\lambda" />-colorings of <TeX tex="G" /> for <TeX tex="\forall \lambda\in\mathbb{Z}^+" />. <TeX tex="P(K_n,\lambda) = \lambda(\lambda-1)(\lambda-2)\cdots" />.</p>
      <p>Worked example (triangle + pendant edges): expressed as <TeX tex="\prod_{i=1}^n(\lambda-m_i)" />, which has degree <TeX tex="n" /> and leading coefficient 1: <TeX tex="\lambda^3(\lambda-1)^3(\lambda-2) = \lambda^7-5\lambda^6+9\lambda^5-7\lambda^4+2\lambda^3" /> — coefficients alternate in sign, 2nd coefficient <TeX tex="=-|E|" />, and it never has a constant term.</p>
      <p>Note: if <TeX tex="|E|\geq1" />, the sum of coefficients of <TeX tex="P(G,\lambda)" /> is 0. <TeX tex="\chi(G) = \min\{k : P(G,k)>0\}" />; for all <TeX tex="m<\chi(G)" />, <TeX tex="G" /> will not be <TeX tex="m" />-colorable, i.e. <TeX tex="P(G,m)=0" />.</p>
      <p><TeX tex="P(G,\lambda)" /> has roots at <TeX tex="0,1,\dots,\chi(G)-1" />. E.g. <TeX tex="\lambda(\lambda-1)(\lambda-2)(\lambda-3)\cdot(\lambda-2)" /> — only <TeX tex="\lambda^1" /> so only 1 component; chromatic number = 4.</p>
      <p>Consider <TeX tex="C_4" /> (a 4-cycle, vertices 1–2–3–4): is 1 &amp; 3 the same color? (1) Not same: <TeX tex="\lambda(\lambda-2)(\lambda-2)(\lambda-1)" />. (2) Same color: <TeX tex="\lambda(\lambda-1)(\lambda-1)" />. Total: <TeX tex="\lambda(\lambda-1)(\lambda-2)^2 + \lambda(\lambda-1)^2" />.</p>
      <p>Consider <TeX tex="C_5" /> (paint 1, 3, 4): Case 1: 1,3,4 all different: <TeX tex="\lambda(\lambda-1)(\lambda-2)^3" />. Case 2: 1&amp;3 same: <TeX tex="\lambda(\lambda-1)^2(\lambda-2)" /> (2&amp;4). Case 3: 1&amp;4 same: <TeX tex="\lambda(\lambda-1)^2(\lambda-2)" /> (3&amp;5).</p>
      <h3>Deletion-Contraction</h3>
      <p>Think about deleting/contracting an edge: delete ⟺ different coloring, contract ⟺ same color.</p>
      <TeX block tex="P(G\setminus e,\lambda) = P(G/e,\lambda) + P(G,\lambda)" />
      <p>For <TeX tex="n\geq3" />: <TeX tex="P(C_n,\lambda) = (\lambda-1)^n + (-1)^n(\lambda-1)" />.</p>
      <h3>Independent Sets &amp; Cliques</h3>
      <p><strong>Independent set</strong> = graphs with no edges <TeX tex="= G(V,\varnothing)" />. For any graph <TeX tex="G" /> that is properly colored, the set of vertices of each color is an independent set. <strong>Clique</strong> = opposite of an independent set.</p>
      <p>Clique in <TeX tex="G" /> ⟺ clique in the complement's "blue" edges; independent set in <TeX tex="G" /> ⟺ clique in the complement's "red" (original) edges.</p>
      <p>Consider a 2-coloring of the edges of <TeX tex="K_6" /> — it has a monochromatic triangle. Consider <TeX tex="\deg(u)=5" />, and by the pigeonhole principle there are at least 3 edges of one color (say blue). Consider the vertices at the other endpoints:</p>
      <ul>
        <li><strong>Case 1:</strong> at least one of them blue → forms a blue triangle.</li>
        <li><strong>Case 2:</strong> all of them red → forms a red triangle.</li>
      </ul>

      <h2 id="ramsey">Ramsey Theory</h2>
      <p>For any integers <TeX tex="n,k>0" />, there exists a smallest <TeX tex="R(n,k)" /> s.t. any graph with <TeX tex="|V|\geq R(n,k)" /> must contain either (1) a clique of size <TeX tex="n" />, or (2) an independent set of size <TeX tex="k" /> (equivalent to finding a clique of size <TeX tex="k" /> if 2-colored).</p>
      <p>To prove some <TeX tex="R(n,k)>m" />, we should prove <TeX tex="m" /> vertices exist with (1) no <TeX tex="K_n" /> and (2) no independent set of size <TeX tex="k" />.</p>
      <p>To prove some <TeX tex="R(n,k)\leq m" />, prove all graphs with <TeX tex="n" /> vertices have <TeX tex="K_n" /> OR an independent set of size <TeX tex="k" />.</p>
      <p><TeX tex="R(2,2)=2" /> — either an independent set of 2 dots, or <TeX tex="K_2" />.</p>
    </div>
  );
}

const MATH3012_TOC = [
  { id: "sets-functions", label: "Sets & Functions" },
  { id: "induction-counting", label: "Induction & Counting Rules" },
  { id: "combinations-binomial", label: "Combinations & Binomial Theorem" },
  { id: "stars-bars", label: "Stars and Bars" },
  { id: "pie", label: "Inclusion-Exclusion Principle" },
  { id: "derangements-rooks", label: "Derangements & Rook Polynomials" },
  { id: "generating-functions", label: "Generating Functions" },
  { id: "partitions", label: "Partitions" },
  { id: "graph-basics", label: "Graph Theory Basics" },
  { id: "trees-planar", label: "Trees & Planar Graphs" },
  { id: "coloring", label: "Coloring & Chromatic Polynomial" },
  { id: "ramsey", label: "Ramsey Theory" },
];

Object.assign(window, { MATH3012Post, MATH3012_TOC });
