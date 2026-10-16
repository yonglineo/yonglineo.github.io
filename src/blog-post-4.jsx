// blog-post-4.jsx — "Competitive Programming Notes #2: 2-SAT + Segment Tree Optimization"
const TeX = window.TeX;
const Spoiler = window.Spoiler;

const CPP_CODE_N2 = `//闲敲棋子落灯花//
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;

const int NN = 6e5 + 500;
stack<int> s;
int dfn[NN], low[NN], timer, cnt, col[NN];
bool vis[NN];
vector<int> G[NN];
vector<int> Neo[NN];
void tarjan(int u) {
    vis[u] = true;
    low[u] = dfn[u] = ++timer;
    s.push(u);
    for (auto v : Neo[u]) {
        if (!dfn[v]) {
            tarjan(v);
            low[u] = min(low[u], low[v]);
        }
        else if (vis[v]) {
            low[u] = min(low[u], dfn[v]);
        }
    }
    if (low[u] == dfn[u]) {
        cnt++;
        while (1) {
            int x = s.top(); s.pop();
            vis[x] = false;
            col[x] = cnt;
            if (x == u) break;
        }
    }
}

int N, M;
void add_edge(int x, int y) {
    Neo[x].push_back(y);
    return;
}
void build(int p, int l, int r) {
    if (l == r) {
        add_edge(p + 2 * N, l + N);
        return;
    }
    int mid = (l + r) >> 1;
    build(p << 1, l, mid);
    build(p << 1 | 1, mid + 1, r);
    add_edge(p + 2 * N, (p << 1) + 2 * N);
    add_edge(p + 2 * N, (p << 1 | 1) + 2 * N);
    return;
}
void add(int p, int l, int r, int ql, int qr, int x) {
    if (ql <= l && r <= qr) {
        add_edge(x, p + 2 * N);
        return;
    }
    int mid = (l + r) >> 1;
    if (ql <= mid) add(p << 1, l, mid, ql, qr, x);
    if (qr >= mid + 1) add(p << 1 | 1, mid + 1, r, ql, qr, x);
    return;
}
bool check(int k) {
    if (k == 1) return true;
    for (int i = 0; i <= 2 * N; i++)
        Neo[i].clear();
    for (int i = 1; i <= N; i++)
        for (auto& v : G[i])
            add_edge(i + N, v);

    for (int i = 1; i <= N; i++) {
        int L = max(1, i - k + 1), R = i - 1;
        if (L <= R) add(1, 1, N, L, R, i);
        L = i + 1; R = min(N, i + k - 1);
        if (L <= R) add(1, 1, N, L, R, i);
    }
    while (s.size()) s.pop();
    timer = 0, cnt = 0;
    for (int i = 1; i <= 6 * N; i++)
        low[i] = dfn[i] = vis[i] = 0;

    for (int i = 1; i <= 6 * N; i++)
        if (!dfn[i])
            tarjan(i);

    for (int i = 1; i <= N; i++)
        if (col[i] == col[i + N])
            return false;
    return true;
}
void solve() {
    cin >> N >> M;
    for (int i = 0; i <= 6 * N; i++) {
        G[i].clear();
        Neo[i].clear();
    }
    for (int i = 0; i < M; i++) {
        int u, v; cin >> u >> v;
        G[u].push_back(v);
        G[v].push_back(u);
    }
    build(1, 1, N);
    int l = 1, r = N;
    while (l < r) {
        int mid = (l + r + 1) >> 1;
        if (check(mid)) l = mid;
        else r = mid - 1;
    }
    cout << l << '\\n';
    return;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr); cout.tie(nullptr);

    int T; cin >> T;
    while (T--) {
        solve();
    }
}
`;

function TwoSatPost() {
  return (
    <div className="post-prose">
      <p><a href="https://codeforces.com/contest/1903/problem/F" target="_blank" rel="noopener">Problem link ↗</a> — Codeforces 1903F</p>

      <h2>Problem summary</h2>
      <p>Given a set of edges connecting two nodes each, we must take at least one node from each edge's ends.</p>
      <p>Let the taken nodes be <TeX tex="a_1, a_2, ..., a_p" /> in sorted order.</p>
      <p><strong>Maximize</strong> <TeX tex="\min_{1 \leq i \leq p-1}(|a_i-a_{i+1}|)" />. If <TeX tex="p=1" />, the value would be <TeX tex="N" />.</p>
      <p><em>Attempt the problem yourself before continuing reading this blog.</em></p>

      <Spoiler summary="Prerequisites">
        <p>Binary search, standard 2-SAT, segment tree.</p>
      </Spoiler>

      <Spoiler summary="If you don't know the second tag in the Prerequisites">
        <p>There are many blogs about 2-SAT (and Tarjan). Read on if you're like me and don't get how to build the graph.</p>
        <p>A good blog in Chinese: <a href="https://www.mina.moe/archives/11387" target="_blank" rel="noopener">link ↗</a>. It provides an excellent description: "A directed edge from A to B means that if we choose A then we <strong>must</strong> choose B, but when we choose B, we <strong>don't necessarily</strong> choose A."</p>
      </Spoiler>

      <Spoiler summary="First observation">
        <p>A wise man once said: "When you see a problem that <strong>maximizes a minimum</strong>... or <strong>minimizes a maximum</strong>..., it's highly likely that it is binary search."</p>
        <p>By observation this problem has a true, ..., true, false, ..., false scenario if we choose a function to check <TeX tex="\min \geq k" />. Try learning binary search from <a href="https://codeforces.com/profile/Um_nik" target="_blank" rel="noopener">Um_nik</a>'s blog first if you can't see this pattern.</p>
      </Spoiler>

      <Spoiler summary="Second observation">
        <p>We need to write a check function to check if the graph satisfies a value <TeX tex="k" /> to have <TeX tex="\min \geq k" />.</p>
        <p>From here on, let <TeX tex="A" /> = we choose node A, <TeX tex="A'" /> = we don't choose A. We have 2 cases:</p>

        <Spoiler summary="Case 1">
          <p>Each edge must have one end chosen.</p>
          <p>To solve this we build an edge from <TeX tex="u'" /> → <TeX tex="v" /> for each <TeX tex="u" /> and all <TeX tex="v \in neighbours(u)" />. When we choose to not take <TeX tex="u" />, we must take <TeX tex="v" />.</p>
        </Spoiler>

        <Spoiler summary="Case 2 (harder)">
          <p><TeX tex="\min \geq k" /></p>
          <p>If we took some node <TeX tex="i" />, we cannot take any <TeX tex="j \in [i-k+1,i+k-1]\backslash\{i\}" />, since <TeX tex="|i-j| < k" /> would violate <TeX tex="\min \geq k" />.</p>
          <p>So we build an edge from <TeX tex="i" /> → <TeX tex="j'" /> for every such <TeX tex="j" />, then run standard 2-SAT with Tarjan to ensure no <TeX tex="i" /> and <TeX tex="i'" /> share a strongly connected component (SCC).</p>
          <p>This reduces the problem to <TeX tex="O(N^2 \log N)" /> — not good enough. Try to optimize it yourself before looking further.</p>
        </Spoiler>
      </Spoiler>

      <Spoiler summary="Optimization">
        <p>The bottleneck is the 2nd case. What if we represent ranges as nodes, using a segment tree to keep the count small?</p>
        <p>Define <TeX tex="tr_{L,R}" /> as the node representing range <TeX tex="[L,R]" />.</p>
        <p>Redo case 2: build an edge from <TeX tex="i" /> → <TeX tex="tr_{i-k+1,i-1}'" /> and <TeX tex="i" /> → <TeX tex="tr_{i+1,i+k-1}'" />. Also add edges from <TeX tex="tr_{L,R}'" /> → <TeX tex="tr_{L,mid}'" /> and <TeX tex="tr_{L,R}'" /> → <TeX tex="tr_{mid+1,R}'" />, since not taking <TeX tex="[L,R]" /> means not taking either half. Every leaf <TeX tex="tr'_{i,i}" /> also needs an edge to <TeX tex="i'" />.</p>
        <p>Run Tarjan and compute SCCs. If <TeX tex="i" /> and <TeX tex="i'" /> share an SCC, the answer is NO. Otherwise YES.</p>
      </Spoiler>

      <p><a href="https://codeforces.com/contest/1903/submission/236990689" target="_blank" rel="noopener">AC code ↗</a></p>

      <Spoiler summary="Code">
        <pre><code>{CPP_CODE_N2}</code></pre>
      </Spoiler>

      <Spoiler summary="Feelings">
        <p>This was the first time I saw a 2-SAT problem — I spent 1.5 hours just reading on 2-SAT. The mixture of ideas (2-SAT, binary search, segment tree) was insane. I submitted 7 times before ACing.</p>
      </Spoiler>

      <Spoiler summary="Tips">
        <p>Represent <TeX tex="i'" /> as the node with index <TeX tex="i+N" />, and <TeX tex="tr_{L,R}" /> (segment-tree index <TeX tex="p" />) as the node with index <TeX tex="p+2N" /> for simpler implementation. Remember to clear all edges created by the previous check function (4 WAs for this). Also make sure indices stay within <TeX tex="[1,N]" /> when connecting <TeX tex="i" /> to <TeX tex="[i-k+1,i-1]" /> and <TeX tex="[i+1,i+k-1]" />.</p>
      </Spoiler>

      <p>Hope you guys learnt something from this blog.</p>
    </div>
  );
}

Object.assign(window, { TwoSatPost });
