// blog-post-6.jsx — "CS3510 Notes: Design & Analysis of Algorithms"
const TeX = window.TeX;

const PSEUDO_MS = `def MS(A[1…n]):            → T(n) = 2T(n/2) + O(n)
    L = MS(A[1…n/2])
    R = MS(A[n/2 + 1…n])
    return merge(L, R)     we only have to prove merge() is correct

def merge(L[1…x], R[1…y]): → T(n) = T(n - 1) + O(1)
    // since L & R are sorted, use two pointers`;

const PSEUDO_QS = `def Qsort(A, l, u):
    if l < u:
        p_i = partition(A, l, u)   // picks a pivot and move (returns index)
        Qsort(A, l, p_i - 1)
        Qsort(A, p_i + 1, u)

def partition(A, l, u):
    // for simplicity: we take pivot as A[u]
    i = l - 1   // i is the last index of "smaller than"
    for j in l…u - 1:   // for each index
        if A[j] <= pivot:
            swap(A[++i], A[j])
    swap(A[i + 1], A[u])
    return i + 1`;

const PSEUDO_FFT = `def FFT(A, w):   // A is in coefficient form
    if w = 1 return A(1)
    Compute A_even(x^2) and A_odd(x^2)
    Call FFT(A_even, w^2)
    Call FFT(A_odd, w^2)
    for i in range 0 … n - 1:
        A(w^i) = A_even(w^2i) + w^i * A_odd(w^2i)
    return [A(w0), A(w1), …]`;

const PSEUDO_EXPLORE = `def explore(G, v):
    marked[v] = true
    previsit(v)
    for (v, u) in E:
        if not marked[u]:
            explore(G, u)
    postvisit(v)

def DFS(G):
    for v in V:
        marked[v] = false
    for v in V:
        if not marked[v]:
            explore(G, v)`;

const PSEUDO_DAG = `def explore(G, v):
    marked[v] = true
    current_path[v] = true   // mark if it's in the current stack
    for (v, u) in E:
        if current_path[u]:
            CYCLE_FOUND
        if not marked[u]:
            explore(G, u)
    current_path[v] = false   // unmark`;

const PSEUDO_TOPSORT = `def topsort(G, v):
    marked[v] = true
    for (v, u) in E:
        if not marked[u]:
            topsort(G, u)
    L = [v] + L`;

const PSEUDO_SCC = `def SCC(G):
    DFS on G for postlabels
    Compute G^rev of G
    Mark & Delete SCCs of G^rev
    // we use this by converting sources → sinks!`;

const PSEUDO_BF = `def BF(G, s):
    dist = [inf] * N
    dist[source] = 0
    for i in 1…N:
        for each edge e in E:
            dist[u] = min(dist[u], dist[v] + w)
    // to check for negative cycle: run one more loop and check if any dist[] decreased`;

const PSEUDO_SPDAG = `def SP_DAG(G, s):
    dist = [inf] * N
    dist[source] = 0
    toposort(G)
    for u in V:   (topological order)
        for each edge e in E:
            dist[u] = min(dist[u], dist[v] + w)`;

const PSEUDO_FW = `for k in 1…V:   // important that this is the midpoint
    for i in 1…V:
        for j in 1…V:
            dis[i][j] = min(dis[i][j], dis[i][k] + dis[k][j])`;

function CS3510Post() {
  return (
    <div className="post-prose">
      <h2 id="may-18">May 18 — Asymptotic Notation & the Master Theorem</h2>
      <p><TeX tex="f(n)" /> is <TeX tex="O(g(n))" /> if there exist constants <TeX tex="c > 0" /> and <TeX tex="n_0 > 0" /> such that for all <TeX tex="n \geq n_0" />: <TeX tex="f(n) \leq c \cdot g(n)" /></p>
      <h3>Notations</h3>
      <ul>
        <li><strong>Big Omega (Ω) — Lower Bound.</strong> <TeX tex="f(n)" /> is <TeX tex="\Omega(g(n))" /> if there exist constants <TeX tex="c > 0" /> and <TeX tex="n_0 > 0" /> such that for all <TeX tex="n \geq n_0" />: <TeX tex="0 \leq c \cdot g(n) \leq f(n)" /></li>
        <li><strong>Big Theta (Θ) — Tight Bound.</strong> <TeX tex="f(n)" /> is <TeX tex="\Theta(g(n))" /> if <TeX tex="f(n)" /> is bounded both above and below by <TeX tex="g(n)" /> (they grow at the same rate). Equivalently: <TeX tex="f(n)" /> is <TeX tex="O(g(n))" /> and <TeX tex="\Omega(g(n))" />.</li>
        <li><strong>Little Omega (ω) — Strict Lower Bound.</strong> <TeX tex="f(n)" /> is <TeX tex="\omega(g(n))" /> means <TeX tex="f(n)" /> grows strictly faster than <TeX tex="g(n)" />. For any constant <TeX tex="c > 0" />, there exists <TeX tex="n_0 > 0" /> such that for all <TeX tex="n \geq n_0" />: <TeX tex="f(n) > c \cdot g(n)" /> (using limits: <TeX tex="\lim_{n\to\infty} f(n)/g(n) = \infty" />).</li>
        <li><strong>Little o (o) — Strict Upper Bound.</strong> <TeX tex="f(n)" /> is <TeX tex="o(g(n))" /> means <TeX tex="f(n)" /> grows strictly slower than <TeX tex="g(n)" />. For any constant <TeX tex="c > 0" />, there exists <TeX tex="n_0 > 0" /> such that for all <TeX tex="n \geq n_0" />: <TeX tex="f(n) < c \cdot g(n)" /> (using limits: <TeX tex="\lim_{n\to\infty} f(n)/g(n) = 0" />).</li>
      </ul>

      <h3>Master Theorem</h3>
      <p>Regime = context (environment), definitions, variables, assumptions.</p>
      <TeX block tex="T(n) = a \cdot T(n/b) + O(n^d)" />
      <ul>
        <li><TeX tex="a" /> = number of recursive calls</li>
        <li><TeX tex="b" /> = factor by which the subproblem size is divided</li>
        <li><TeX tex="d" /> = exponent representing the work done outside recursive calls (e.g. splitting/combining)</li>
      </ul>
      <p>Step 0: <TeX tex="O(n^d)" /> → assuming work done at top level = <TeX tex="O(n^d)" /><br />
      Step 1: <TeX tex="a \cdot O((n/b)^d)" /> → <TeX tex="a" /> calls, and we now have size <TeX tex="n/b" /> to call<br />
      Step 2: <TeX tex="a^2 \cdot O((n/b^2)^d)" /> ... → <TeX tex="a \cdot a" /> calls (split), and we now have size <TeX tex="n/b^2" /> to call<br />
      …<br />
      Step i: <TeX tex="a^i \cdot O((n/b^i)^d)" />, reaching <TeX tex="O(1)" /> when <TeX tex="i = \log_b(n)" /></p>
      <TeX block tex="T(n) = \sum_{i=0}^{\log_b(n)} a^i \cdot O((n/b^i)^d) = O(n^d) + O((n/b)^i) + \dots + O(n^{\log_b(a)})" />
      <p>Cases:</p>
      <ol>
        <li>If <TeX tex="\log_b(a) > d" />, then <TeX tex="T(n) = O(n^{\log_b(a)})" /></li>
        <li>If <TeX tex="\log_b(a) = d" />, then <TeX tex="T(n) = O(n^d \log n)" /></li>
        <li>If <TeX tex="\log_b(a) < d" />, then <TeX tex="T(n) = O(n^d)" /></li>
      </ol>

      <p>In certain cases, we assume addition takes <TeX tex="O(1)" />, but it depends on the number of bits. Taking merge sort as an example — we assume comparison is <TeX tex="O(1)" />, <TeX tex="n" /> = number of elements (can be proved by strong induction):</p>
      <pre><code>{PSEUDO_MS}</code></pre>

      <h2 id="may-20">May 20 — Arithmetic (Multiplication, Mod-Exp, Matrices)</h2>
      <p>Let <TeX tex="x" /> be a number, and <TeX tex="n" /> = number of bits to express <TeX tex="x" />, <TeX tex="n \sim \log x" />. We assume <TeX tex="x \geq 0" /> in this class.</p>
      <p>To add two numbers, we simply need a circuit (bit-adder with carry-in from CS 2110). Do that <TeX tex="n" /> times, so we get a general runtime of <TeX tex="O(n) \sim 3n + 1" />.</p>
      <p>To multiply two numbers: easy to prove (given above), by considering shifts and bits in a general format. Now let's try the divide &amp; conquer technique: let <TeX tex="z = \text{mult}(x, \lfloor y/2 \rfloor)" /> repeatedly… correctness can be proved by induction &amp; cases (odd and even). We go at least <TeX tex="\log_2(y)" /> layers (that is <TeX tex="n" />) and add each layer, so <TeX tex="O(n^2)" /> total.</p>
      <p>Now let's try the following: we can do this easily using bitmasks (OR to store and AND to remove). So there are 4 (<TeX tex="a=4" />) subcases, and all variables have <TeX tex="n/2" /> bits, so <TeX tex="b=2" />. Linear work each step: <TeX tex="d=1" />. Overall <TeX tex="O(n^2)" />.</p>
      <p>Hmmmm… the middle part looks simplifiable: <TeX tex="x_Ly_R + x_Ry_L = (x_L+x_R)(y_L+y_R) - x_Ly_L - x_Ry_R" /></p>
      <p>So that means <TeX tex="2^n \cdot x_Ly_L + 2^{n/2}\cdot((x_L+x_R)(y_L+y_R) - x_Ly_L - x_Ry_R) + x_Ry_R" />. Let <TeX tex="x_Ly_L=A" /> and <TeX tex="x_Ry_R=B" />:</p>
      <TeX block tex="2^n \cdot A + 2^{n/2}\cdot((x_L+x_R)(y_L+y_R) - A - B) + B" />
      <p>And that means we have 3 subcases (work is also used to multiply <TeX tex="(x_L+x_R)(y_L+y_R)" />), and <TeX tex="b=2" />. So now we have <TeX tex="O(n^{\log_2 3}) = O(n^{1.59})" />.</p>
      <h3>Mod Expo</h3>
      <p>Let us try to calculate <TeX tex="a^x \bmod n" />. Same recursion (D&amp;C) by looking at <TeX tex="x" /> as a sum of powers of 2 (expressed in binary). Multiplication each layer, so overall <TeX tex="O(n^{2.59})" />.</p>
      <h3>Matrix Arithmetic</h3>
      <p>Now we assume all arithmetic (mult and add) to be <TeX tex="O(1)" />. So that's <TeX tex="O(n^3)" /> operations (<TeX tex="n" /> multiplications, and <TeX tex="n^2" /> elements). Similarly, if we consider a small (2×2) matrix we can do block-wise multiplication.</p>
      <p>Now we have 8 cases (<TeX tex="a=8" />) and <TeX tex="n/2" /> so <TeX tex="b=2" />. At the same time <TeX tex="d=2" />, because we need to add the elements of each matrix together, so <TeX tex="n^2" />. Overall <TeX tex="O(n^3)" />. Similarly, using the same idea, we can simplify mults to adds.</p>

      <h3>Runtime Analysis</h3>
      <p><strong>Least Upper Bound</strong> (e.g. <TeX tex="O(n\log n)" />): if we have multiple solutions, we take the "best" one as our time complexity.<br />
      <strong>Greatest Lower Bound</strong> (e.g. at least <TeX tex="\Omega(n)" />): if we have multiple solutions, we take the "worst" one as our time complexity.<br />
      <TeX tex="\Theta(f(n))" /> if they match.</p>
      <p><strong>Prove that binary search is <TeX tex="\Omega(\log n)" /> at best:</strong> comparison regime — take some sequence <TeX tex="c_1c_2c_3\dots c_k" />. For each comparison <TeX tex="k" />, we can express it as a function of the previous comparison <TeX tex="k-1" />, so we can express it as a decision tree.</p>
      <p>The depth is the max number of comparisons made per call. We want some tree <TeX tex="T" /> with min max depth. Let's prove that depth is <TeX tex="\Omega(\log n)" />. Assume some decision tree exists with max depth <TeX tex="o(\log n)" /> (the negation). The tree will have number of leaves <TeX tex="= 2^{o(\log n)} \ll n" />. But since we must have <TeX tex="n" /> outcomes, by the pigeonhole principle there exists <TeX tex="t, t'" /> with <TeX tex="t \neq t'" /> but the algorithm outputs the same outcome.</p>
      <p><strong>Prove that sorting is <TeX tex="\Omega(n\log n)" /> at best:</strong> here we can't just say input = array and output = sorted, because there's only 1 output. Take all permutations as the leaves, and the sorted array = root. We have <TeX tex="n!" /> leaves, and take <TeX tex="o(\log(n!))" /> as a minimum bound. By the pigeonhole principle we'd have <TeX tex="2^{o(\log(n!))}" /> leaves, which is less than <TeX tex="n!" /> — contradiction.</p>

      <h2 id="may-27">May 27 — Quicksort, QuickSelect, Median of Medians</h2>
      <p><strong>Quicksort:</strong> perfectly places an element (pivot) and separates elements left and right to be less than and more than it respectively.</p>
      <pre><code>{PSEUDO_QS}</code></pre>
      <p>The runtime of <code>partition(A, l, u)</code> is <TeX tex="O(n)" />.</p>
      <p><strong>Worst case:</strong> <TeX tex="T(n) = T(n-1) + O(n)" /> → overall <TeX tex="O(n^2)" />.<br />
      <strong>Best case</strong> (not a real thing): <TeX tex="T(n) = 2T(n/2) + O(n)" /> → overall <TeX tex="O(n\log n)" />.</p>
      <p>In general, <TeX tex="T(n) = T(p \cdot n) + T((1-p) \cdot n) + O(n)" />. Assume we get the 99th percentile each time: <TeX tex="T(n) = T(99n/100) + O(n)" />. Runtime = depth of decision tree × <TeX tex="O(n)" />, and <TeX tex="\log_{100/99}(n) \sim O(\log n)" />. So as long as you don't get the worst case (max) every time, you get <TeX tex="O(n\log n)" />.</p>
      <h3>Average Case Analysis</h3>
      <p>Keep taking the max: <TeX tex="\tfrac1n \cdot \tfrac{1}{n-1} \cdot \tfrac{1}{n-2}\cdots = \tfrac{1}{n!}" />. Keep taking the second max: <TeX tex="\tfrac{1}{n-2}\cdot\tfrac{1}{n-4}\cdot\tfrac{1}{n-6}\cdots = \tfrac{1}{n!}" />. Let's randomly choose an element instead — our runtime is the average runtime over all pivots.</p>
      <TeX block tex="T(n) = T(n-i-1) + T(i) + O(n)" />
      <p>So <TeX tex="T(n) = \tfrac1n \sum_{i=1}^{n-1}\{T(i) + T(n-i-1)\} + O(n)" />. By intuition the sums are symmetrical, so <TeX tex="T(n) = \tfrac{2}{n}\sum T(i) + O(n)" />. Multiply by <TeX tex="n" />:</p>
      <p><TeX tex="n \cdot T(n) = 2\sum_{i}^{n-1} T(i) + n^2" /><br />
      <TeX tex="(n-1)\cdot T(n-1) = 2\sum_{i}^{n-2} T(i) + (n-1)^2" /></p>
      <p>So <TeX tex="n\cdot T(n) - (n-1)\cdot T(n-1) = 2T(n-1) + O(2n-1)" />. Therefore <TeX tex="n\cdot T(n) = (n+1)\cdot T(n-1) + 2n" />, and <TeX tex="T(n)/(n+1) = \tfrac1n T(n-1) + \tfrac{2}{n+1}" />.</p>
      <p>The two terms are off by 1: <TeX tex="T(n)/(n+1) = T(n-2)/(n-1) + 2/n + 2/(n+1)" />, so <TeX tex="T(n)/(n+1) = 2/(n+1) + 2/n + 2/(n-1) + \dots" />, and in fact this is <TeX tex="\sim \ln(n)" /> plus some constant. Therefore <TeX tex="T(n) = (n+1)\log n = O(n\log n)" />.</p>
      <h3>QuickSelect</h3>
      <p>QuickSelect is just partition, but only repeatedly entering the side of the array that contains the element we want (e.g. the <TeX tex="k" />-th element after sorting). If we perfectly split into 2 halves, <TeX tex="T(n) = T(n/2) + O(n)" /> → best runtime <TeX tex="O(n)" /> (also the average case if 2 is replaced with some <TeX tex="b" />, because <TeX tex="\log_b(1) = 0 < d" />). Worst case: <TeX tex="O(n^2)" />, because <TeX tex="T(n) = T(n-1) + O(n)" /> — worse than mergesort then getting <TeX tex="A[k]" />.</p>
      <h3>Median of Medians</h3>
      <p>A technique that should probably choose a good pivot — around the 30th to 70th percentile of the array. It improves the worst case, probably to the average case, from <TeX tex="O(n^2)" /> to <TeX tex="O(n\log n)" />.</p>
      <p>Split the array into <TeX tex="n/5" /> arrays of size 5. Sort each in <TeX tex="O(5)=O(1)" />, and <TeX tex="n/5" /> arrays give <TeX tex="O(n)" /> sorting time. Then arrange the medians into a new array, and sort those medians into <TeX tex="m/5" /> arrays…</p>
      <p>Now the work is <TeX tex="T(n) = T(n/5) + O(n)" /> → runtime <TeX tex="O(n)" />. Intuitively, take <TeX tex="m=n/5" />: there are <TeX tex="\sim m/2" /> elements smaller and <TeX tex="m/2" /> greater than our median of medians. Worst case: all medians less than <TeX tex="X" /> have max value <TeX tex="< X" />, and all medians greater than <TeX tex="X" /> have second-minimum value <TeX tex="< X" />. Then we have <TeX tex="m/2\cdot 2 + m/2 \cdot 5" />, giving <TeX tex="3.5n/5 \sim 70\%" /> percentile.</p>

      <h2 id="jun-1">Jun 1 — FFT, Closest Pair, Convex Hull</h2>
      <p><strong>Fast Fourier Transform:</strong> <TeX tex="f(x) = \sum a_i \sin(b_i x)" /></p>
      <h3>Arithmetic on polynomials</h3>
      <p>Let <TeX tex="A(x) = a_0 + a_1x + a_2x^2 + \dots + a_{n-1}x^{n-1}" />.</p>
      <p><strong>Addition:</strong> we add polynomials according to the sum of their coefficients in <TeX tex="O(n^2)" />. But if we use <TeX tex="x=7" />, <TeX tex="A(7)" /> becomes an integer, and we can add <TeX tex="A(7)" /> and <TeX tex="B(7)" /> in <TeX tex="O(n)" />.</p>
      <p><strong>Multiplication:</strong> <TeX tex="A(x)\cdot B(x) = a_0b_0 + (a_1b_0+a_0b_1)x + \dots" /> — this is <TeX tex="O(n^2)" />. FFT is used to make this faster.</p>
      <p>Property of curves: <TeX tex="n" /> points can uniquely define an <TeX tex="n-1" /> degree polynomial. Now let <TeX tex="C(x) = A(x) + B(x)" /> (or ×). We can get <TeX tex="n+1" /> values (by substituting into <TeX tex="A(x)" /> and <TeX tex="B(x)" />) to define <TeX tex="C(x)" />.</p>
      <p><strong>Problem for multiplication:</strong> if <TeX tex="A(x)" /> has degree <TeX tex="n" /> and <TeX tex="B(x)" /> has degree <TeX tex="m" />, <TeX tex="C(x)" /> has degree <TeX tex="n+m" />. So we need to oversample (e.g. <TeX tex="2n" /> points). Our workflow:</p>
      <ol>
        <li>Convert coefficient form into sample form (naive: <TeX tex="O(n^2)" />)</li>
        <li>Operation (multiplication/addition): <TeX tex="O(n)" /></li>
        <li>Convert sample form back to coefficient form (naive: <TeX tex="O(n^2)" />)</li>
      </ol>
      <p>FFT multiplies polynomials in <TeX tex="O(n\log n)" /> time. Let's separate the even and odd powers:</p>
      <p><TeX tex="A(x) = A_{even}(x^2) + x\cdot A_{odd}(x^2)" /><br />
      <TeX tex="A(-x) = A_{even}(x^2) - x\cdot A_{odd}(x^2)" /></p>
      <p>But there's a problem: since <TeX tex="x^2 \geq 0" />, we can only prove this for non-negative integers. So we want to also prove it for imaginary numbers (<TeX tex="i" />). <TeX tex="Z=a+bi" />, and we can solve <TeX tex="Z^n-1=0 \to Z^n=1" />. This gives roots <TeX tex="[w_0, w_1, \dots]" /> with <TeX tex="w^j = e^{2\pi i j/n}" />. And <TeX tex="-w^j = w^{n/2+j}" />; <TeX tex="w^2" /> is a root of unity for <TeX tex="Z^{n/2}-1=0" />.</p>
      <pre><code>{PSEUDO_FFT}</code></pre>
      <p>One notable property:</p>
      <p><TeX tex="\text{FFT}([\text{coefficients}], w) \to [\text{samples}]" /><br />
      <TeX tex="\tfrac1n \cdot \text{FFT}([\text{samples}], w^{-1}) \to [\text{coefficients}]" /></p>

      <h3>Closest Pair of Points</h3>
      <p>Given a set of (x, y) coordinates, find the closest pair (Euclidean). Separate the plane into left and right halves; assume it finds the closest pairs on the left and right sub-array.</p>
      <p>Naive idea: let <TeX tex="d = \min(\text{left\_pair}, \text{right\_pair})" />, <TeX tex="d < \max x/2" />, create an interval <TeX tex="[mid-d, mid+d]" />: now <TeX tex="T(n) = 3T(n/2) + O(n) \to O(n^{1.59})" />.</p>
      <p>Using a property — we know <TeX tex="x" /> is from the left and <TeX tex="y" /> is from the right, the <TeX tex="x" /> distance is set. We can prove we only need to check ~7 points with the closest <TeX tex="y" /> values by imagining points as spheres. This simplifies to <TeX tex="T(n) = 2T(n/2) + O(n)" />.</p>

      <h3>Convex Hull</h3>
      <p><strong>Convex:</strong> between every point enclosed, the shortest path stays inside the polygon. If any interior angle is <TeX tex="> 180°" /> (dipping in), it's NOT convex.</p>
      <p><strong>Graham Scan:</strong></p>
      <ol>
        <li>Choose the point with lowest y value (tie-break on lowest x).</li>
        <li>Find all angles to other points from this first point.</li>
        <li>Sort the points by increasing angle.
          <ul>
            <li>Note: just choosing the minimum angle might give an angle <TeX tex="> 180°" />.</li>
            <li>So we maintain a stack, keeping the order of exterior angles — if an interior angle <TeX tex="> 180°" /> forms, remove the previous point until we get one <TeX tex="\leq 180°" />.</li>
          </ul>
        </li>
        <li>Push points onto the stack in this order if the exterior angle <TeX tex="< 180°" />, otherwise pop.</li>
      </ol>

      <h2 id="jun-3">Jun 3 — Graphs, DFS, DAGs, SCCs</h2>
      <p>A graph is defined as <TeX tex="G=(V,E)" />, where <TeX tex="E" /> is a subset of <TeX tex="V \times V" />. Technically, a graph can encode everything. Graphs can be directed.</p>
      <p>Recall:</p>
      <ol>
        <li>We can use an adjacency matrix to record nodes <TeX tex="O(V^2)" />, access in <TeX tex="O(1)" />.</li>
        <li>In a random (sparse) graph, <TeX tex="E \sim V" /> to <TeX tex="V\log V" />.</li>
        <li>We can also use adjacency lists (linked list or array).</li>
      </ol>
      <pre><code>{PSEUDO_EXPLORE}</code></pre>
      <p>E.g. to get a timestamp, we can just modify <code>previsit</code> and <code>postvisit</code>. However, we need to consider disconnected components (hence the outer loop over all <TeX tex="v \in V" /> in <code>DFS</code>).</p>
      <h3>Directed Acyclic Graph (DAG)</h3>
      <p>A directed graph with no cycles. Modifying <code>explore()</code>:</p>
      <pre><code>{PSEUDO_DAG}</code></pre>
      <p>Topological sort lets us have <TeX tex="A \to B \to C \dots" /> and maybe <TeX tex="A \to C \dots" />. Let's try DFS, sort by post label: <TeX tex="O(V+E+V\log V)" />. Put the post labels into an array (<code>top[timestamp] = u</code>): <TeX tex="O(V+E)" />.</p>
      <pre><code>{PSEUDO_TOPSORT}</code></pre>
      <h3>Strongly Connected Components</h3>
      <p>An SCC means that for every component, all vertices can reach any other vertex in the same component — there exists a cycle between any 2 vertices. If you collapse the components into one vertex, it becomes the <em>metagraph</em>. Every metagraph is a DAG.</p>
      <p><TeX tex="\text{Out[source]} = \text{MAX}" /> for a DAG; <TeX tex="\text{In[sink]} = \text{MIN}" /> and <TeX tex="\text{Out[sink]} = \text{MIN}" /> for a DAG.</p>
      <p>To find SCCs: the lowest post-label might not be in the sink, but the highest post-label is in the source.</p>
      <pre><code>{PSEUDO_SCC}</code></pre>

      <h2 id="jun-10">Jun 10 — MST, Shortest Paths, Kirchhoff's Theorem</h2>
      <p>A Minimum Spanning Tree is: (1) acyclic, (2) for each pair of vertices there's a unique path, (3) <TeX tex="|E| = |V|-1" />, AND all nodes are connected, AND the sum over edges is minimal.</p>
      <p><strong>Kruskal:</strong> sort edges, then add if it doesn't form a cycle (use DSU).</p>
      <h3>Bellman-Ford (can find negative cycles)</h3>
      <pre><code>{PSEUDO_BF}</code></pre>
      <p>Notice that this is <TeX tex="O(VE)" />.</p>
      <h3>Shortest Path in a DAG</h3>
      <pre><code>{PSEUDO_SPDAG}</code></pre>
      <p>This is <TeX tex="O(V+E)" />.</p>
      <h3>Floyd-Warshall</h3>
      <p>Assume <TeX tex="v_1,v_2,\dots,v_k" /> is calculated and we want to check <TeX tex="v_i" /> and <TeX tex="v_j" />'s distances:</p>
      <pre><code>{PSEUDO_FW}</code></pre>

      <h3>Kirchhoff's Tree Matrix Theorem</h3>
      <p>Read: MIT resources and Cornell resources.</p>
      <p><TeX tex="L = \text{Degree Matrix} - \text{Adj}" />, or <TeX tex="L = BB^\top" /> where <TeX tex="B" /> = edge incidence (+1 for start, −1 for end).</p>
      <p><TeX tex="T(G) = T(G-e) + T(G/e)" /> → this means we concatenate the two ends into one node.</p>
      <p>Number of spanning trees = <TeX tex="\det(L(G)\text{ delete }(1,1))" />.</p>
      <p><TeX tex="\det(L[i]) = \sum (\det(B_S[i]))^2" /><br />
      <TeX tex="\det(L_G[i]) = \det(L_{G-e}[i]) + \det(L_{G/e}[j])" /></p>
      <p><strong>Fundamental Adjugate Identity:</strong> <TeX tex="L_G \cdot \text{adj}(L_G) = \det(L_G) I" /></p>
      <p>Matrix of cofactors (<TeX tex="J" /> is the all-ones matrix): <TeX tex="\text{adj}(L_G) = \tau(G) J" /></p>
      <p>From eigenvalues (<TeX tex="\lambda" />): <TeX tex="\tau(G) = \tfrac1n \prod_{i=2}^{n} \lambda_i" /></p>
      <p><TeX tex="\det = 0" />: understand it as a vector of <TeX tex="n" /> dimensions (setting each vertex in a different dimension) — if we somehow get <TeX tex="\det()=0" />, the rows and columns are linearly dependent, meaning some sum of vectors can be 0, which means we can go back to itself (a cycle).</p>
      <p><TeX tex="\det = 1" />: we keep removing leaves, since a leaf must have <TeX tex="\deg(\text{leaf})=1" />, so its row has only 1 value (1 or −1) and the rest are 0. Removing that row multiplies our det by 1 or −1.</p>

      <h3>WQS Binary Search (WQS二分)</h3>
      <p>Given <TeX tex="n" /> objects, we need to take <TeX tex="k" /> objects such that we maximize/minimize some kind of contribution.</p>
      <ul>
        <li><a href="https://www.luogu.com/article/hrulskjw" target="_blank" rel="noopener">luogu.com/article/hrulskjw ↗</a></li>
        <li><a href="https://www.luogu.com.cn/problem/P5633" target="_blank" rel="noopener">luogu.com.cn/problem/P5633 ↗</a></li>
      </ul>

      <h3>Tree DP</h3>
      <p>Just learn from online resources:</p>
      <ul>
        <li><a href="https://usaco.guide/gold/dp-trees?lang=cpp" target="_blank" rel="noopener">USACO Guide — DP on Trees ↗</a></li>
        <li><a href="https://oi-wiki.org/dp/tree/" target="_blank" rel="noopener">OI Wiki — Tree DP ↗</a></li>
        <li><a href="https://www.cnblogs.com/RioTian/p/15163878.html" target="_blank" rel="noopener">cnblogs.com/RioTian/p/15163878 ↗</a></li>
      </ul>

      <h2 id="jul-8">Jul 8 — NP-Completeness &amp; Zero-Knowledge Proofs</h2>
      <p><TeX tex="\text{NP-Completeness} = \text{NP-Hard} + \text{Problem in NP}" />. "I can't find an efficient algorithm, because the experts can't find it either."</p>
      <p>Consider sorting (and outputting the indices) as a two-step algorithm: Input → Sorted Indices → Output, with the two steps being algorithms A and B. Assume there's an algorithm for A that is "better," meaning <TeX tex="o(n\log n)" />. If so, <TeX tex="A+B = o(n\log n)" />, which would solve "sorting methods" better than all current methods — but we've proved sorting requires <TeX tex="\Omega(n\log n)" /> time. Contradiction.</p>
      <p><strong>P:</strong> the set of problems solvable in polynomial time (e.g. sorting, assuming polynomial is "efficient").</p>
      <p><strong>NP:</strong> the set of problems verifiable in polynomial time — we can only check if an answer is correct, not necessarily solve the problem. Consider: given <TeX tex="n" /> and <TeX tex="m" />, does there exist an integer <TeX tex="f" /> with <TeX tex="1<f<m" /> that is a factor of <TeX tex="n" />? It's hard to check integers one by one as <TeX tex="m\to\infty" />. But as a "grader," we simply check if <TeX tex="n/f" /> is an integer once given <TeX tex="f" /> — that's possible!</p>
      <p><strong>NP-Complete:</strong> problems we're not sure we can solve from scratch, but we can transform any NP-Complete problem into any other NP-Complete problem in polynomial (<TeX tex="O(n^k)" />) time. So if we solve one, we solve all. Formally, <TeX tex="B" /> is NP-Complete if <TeX tex="B" /> is in NP, and for all <TeX tex="A" /> in NP, <TeX tex="A \leq B" /> (meaning <TeX tex="B" /> is at least as hard as all of NP).</p>
      <p><strong>NP-Hard:</strong> the set of the hardest problems — might even be unverifiable. You can also transform any NP-Hard problem into any other NP-Hard problem.</p>

      <p>A puzzle: <TeX tex="n" /> rooms, each with two holes to jump into. Rooms connect to games; each game requires a room to send a mushroom (+1 hp), and each game automatically −1 hp after ending. We can prove that if a valid 3SAT assignment exists, the game is solvable, and vice versa — so 3SAT <TeX tex="\leq" /> Puzzle, therefore Puzzle is NP.</p>
      <p>Consider a set of tiles and an <TeX tex="n\times m" /> board to fill. Why NP-hard? Make it 1-D and only consider widths — by the subset-sum problem, <TeX tex="O(n\cdot T)" /> where <TeX tex="T = \text{sum} = 2^{\text{bits}}" />, so subset sum <TeX tex="\leq" /> Puzzle: NP.</p>
      <p><a href="https://cryptolab.gtisc.gatech.edu/ladha/CS3510F23/3510L18.pdf" target="_blank" rel="noopener">Lecture 18 slides ↗</a></p>

      <h3>Zero-Knowledge Proof</h3>
      <p>Consider believing you're right by some "clues," without knowing the answer. Let the user's answer be <TeX tex="X" />, <TeX tex="A" /> the accepted answer set, and verifier <TeX tex="V(x,c)" /> for some <TeX tex="c" /> without knowing <TeX tex="x" />. Three conditions:</p>
      <ol>
        <li><strong>Completeness:</strong> if <TeX tex="X \in A" />, honest <TeX tex="U" /> can convince honest <TeX tex="C" />.</li>
        <li><strong>Soundness:</strong> if <TeX tex="X \notin A" />, <TeX tex="U" /> can convince <TeX tex="C" /> only with negligible probability.</li>
        <li>Verifier <TeX tex="V" /> learns nothing about <TeX tex="c" />.</li>
      </ol>
      <p>Assume a hash function mapping a larger set to a smaller one — by the pigeonhole principle there must be a collision, though there's a polynomial-time algorithm ensuring the distribution is <TeX tex="1/2^n" />.</p>
      <p>Coin-flip example: A and B guess a coin flip, result 0/1, B guesses.</p>
      <ol>
        <li>A generates a long string <code>STRING</code>.</li>
        <li>A flips a coin and sends <TeX tex="Y = \text{HASH}(\text{STRING}, \text{coin})" /> to B and asks B to guess.</li>
        <li>B answers; A sends <code>STRING</code> and <code>coin</code> to B. If B guesses incorrectly, we know it's the other side.</li>
        <li>B computes <TeX tex="\text{HASH}(\text{STRING}, \text{Correct})" /> and checks it against <TeX tex="Y" /> — the hash function makes it highly unlikely that A cheated.</li>
      </ol>
      <p>For 3-coloring, a protocol:</p>
      <ol>
        <li>Randomly guess an edge and check if the endpoints differ.</li>
        <li>If an edge proves invalid, that's a <TeX tex="1/E" /> chance of proving wrong.</li>
        <li>Otherwise there's a <TeX tex="(1-1/E)" /> chance of letting it pass.</li>
      </ol>
      <p>Repeat the protocol <TeX tex="k" /> times, giving <TeX tex="(1-1/E)^k" />.</p>
      <p><strong>Min-Cut Max-Flow.</strong></p>

      <h2 id="jul-20">Jul 20 — Primality Testing &amp; Randomized Algorithms</h2>
      <h3>Primality and Compositeness</h3>
      <ul>
        <li>To check if a number is composite, verify all <TeX tex="a \leq \sqrt n" /> such that <TeX tex="n = ab" />.</li>
        <li>Since <TeX tex="\sqrt n = n^{1/2}" /> and <TeX tex="n = 2^k" /> (<TeX tex="k" /> = number of bits), this is <TeX tex="O(2^k)" /> — exponential.</li>
      </ul>
      <h3>Fermat's Little Theorem</h3>
      <p>If <TeX tex="1 \leq a < p" /> and <TeX tex="\gcd(a,p)=1" />, then <TeX tex="a^{p-1} \equiv 1 \pmod p" />.</p>
      <h3>Rabin-Miller Algorithm</h3>
      <p>A probabilistic primality test. It relies on selecting random values for <TeX tex="a" /> to verify the primality of <TeX tex="n" />. Numbers that satisfy Fermat's Little Theorem but aren't actually prime are called <strong>Carmichael numbers</strong> (very rare).</p>
      <h3>Approximating π</h3>
      <p><TeX tex="\tan(\pi/4) = 1 \to 4\arctan(1) = \pi" />. By Taylor series: <TeX tex="\pi = 4(1 - 1/3 + 1/5 - 1/7 + \dots)" />.</p>
      <p><strong>Monte Carlo Method:</strong> generate random points <TeX tex="(x,y)" /> where <TeX tex="-1\leq x,y\leq 1" />. If <TeX tex="x^2+y^2\leq 1" />, the point falls within the circle. Since the circle's area is <TeX tex="\pi" /> and the square's is 4, the ratio of points inside the circle to total points approximates <TeX tex="\pi" />:</p>
      <TeX block tex="\pi/4 = \text{in the circle} / \text{total} \;\to\; \pi = 4\cdot(\text{in the circle}/\text{total})" />
      <p><strong>Las Vegas algorithm</strong> → halts in expected poly-time, with no error.</p>
      <h3>Karger's Algorithm</h3>
      <p>Repeatedly choose an edge and collapse the endpoints.</p>
      <ul>
        <li>By the Euler handshake, min-cut <TeX tex="\leq \deg(u)" />, so min-cut <TeX tex="= 2E/V" />.</li>
        <li>The chance of choosing an edge from the min-cut is <TeX tex="\leq 2/V" />.</li>
        <li>The probability of not choosing any min-cut edge is proportional to <TeX tex="1/V^2" />.</li>
      </ul>
      <p>Run the algorithm <TeX tex="V^2" /> times and check the results.</p>

      <h2 id="jul-22">Jul 22 — Approximation Algorithms</h2>
      <ul>
        <li><TeX tex="M" />: maximal matching (set of disjoint edges selected).</li>
        <li><TeX tex="C" />: approximated vertex cover (both endpoints of every edge in <TeX tex="M" />).</li>
        <li><TeX tex="C^*" />: optimal minimum vertex cover.</li>
      </ul>
      <p><strong>Formulas &amp; proof:</strong></p>
      <ol>
        <li><TeX tex="|C| = 2|M|" /> (the algorithm adds exactly 2 vertices per random disjoint edge).</li>
        <li><TeX tex="|C^*| \geq |M|" /> (edges in <TeX tex="M" /> share no vertices — to cover <TeX tex="M" />, <TeX tex="C^*" /> must select at least 1 unique vertex per edge).</li>
        <li><TeX tex="|C| \leq 2|C^*|" /> (substitute <TeX tex="|M|=|C|/2" /> into the inequality: <TeX tex="|C|\geq|C|/2" />, therefore <TeX tex="|C|\leq 2|C^*|" />).</li>
      </ol>

      <h3>Set Covers</h3>
      <p>Assume a decreasing vertex-cover sequence <TeX tex="n_0 > n_1 > n_2 > \dots > n_t" />, where <TeX tex="n_t" /> = number of uncovered elements remaining at the start of step <TeX tex="t" />. Assume the optimal sequence is <TeX tex="k" /> terms, so by the pigeonhole principle there's at least one term with <TeX tex="\geq n/k" /> "pigeons."</p>
      <p>So <TeX tex="n_t \leq n_{t-1} - n_{t-1}/k" />. Intuition: reversing the process, if we distribute <TeX tex="n_{t-1}" /> to the remaining <TeX tex="k" /> vertices, at least one has an average of <TeX tex="n_{t-1}/k" />, so choosing optimally (max) away from <TeX tex="n_{t-1}" /> gives <TeX tex="n_t" />.</p>
      <p>Using <TeX tex="1-x < e^{-x}" />, we get <TeX tex="n_t \leq |x|\cdot e^{-t/k}" />, so <TeX tex="t/k \leq \ln(x)" />, putting this on the order of <TeX tex="\ln(n)" />.</p>
      <p>Similarly, if we randomly guess variables in 3SAT, the fraction of satisfied clauses is <TeX tex="\approx 7/8\, m" />, so it's a <TeX tex="7/8" />-approximation algorithm.</p>

      <h3>Knapsack (FPTAS)</h3>
      <p>If we scale <TeX tex="v_i' = (v_i \cdot n)/(\epsilon \cdot v_{max})" /> to make <TeX tex="v_i' \leq n/\epsilon" />. Since the runtime is <TeX tex="O(V\cdot n)" /> where <TeX tex="V = \sum v_i' = n\cdot(n/\epsilon)" />, the runtime is <TeX tex="O(n^3/\epsilon)" />.</p>
      <p>Let <TeX tex="S" /> be the optimal choice (all <TeX tex="i\in S" />), so <TeX tex="V = \sum v_i' = \sum \lfloor (v_i\cdot n)/(\epsilon\cdot v_{max})\rfloor" />. We can underestimate this to get <TeX tex="\sum((v_i\cdot n)/(\epsilon\cdot v_{max}) - 1)" />, so <TeX tex="(n/(\epsilon\cdot v_{max}))\cdot\sum v_i - n = (n/(\epsilon\cdot v_{max}))\cdot C^* - n" />. So <TeX tex="\sum v_i' = (n/(\epsilon\cdot v_{max}))\cdot C^* - n" />.</p>
      <p>Approximate the <TeX tex="S'" /> choice (all <TeX tex="i\in S'" />): let <TeX tex="C=\sum v_i \geq \tfrac{\epsilon\cdot v_{max}}{n}\sum v_i'" /> for <TeX tex="i\in S'" />, equivalent to DP after scaling. <TeX tex="\sum v_i'" /> is more than <TeX tex="n/(\epsilon\cdot v_{max})\cdot C^* - n" /> (optimal), so <TeX tex="C \geq C^* - \epsilon\cdot v_{max} \geq C^* - \epsilon\cdot C^*" />, giving <TeX tex="C \geq (1-\epsilon)\cdot C^*" />.</p>
    </div>
  );
}

const CS3510_TOC = [
  { id: "may-18", label: "Asymptotics & Master Theorem" },
  { id: "may-20", label: "Arithmetic & D&C Multiplication" },
  { id: "may-27", label: "Quicksort & Median of Medians" },
  { id: "jun-1", label: "FFT, Closest Pair, Convex Hull" },
  { id: "jun-3", label: "Graphs, DFS, DAGs, SCCs" },
  { id: "jun-10", label: "MST, Shortest Paths, Kirchhoff" },
  { id: "jul-8", label: "NP-Completeness & ZK Proofs" },
  { id: "jul-20", label: "Primality & Randomized Algos" },
  { id: "jul-22", label: "Approximation Algorithms" },
];

Object.assign(window, { CS3510Post, CS3510_TOC });
