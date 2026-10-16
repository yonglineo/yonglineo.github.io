// blog-post-2.jsx — "Competitive Programming Notes #4: Virtual Trees"
const TeX = window.TeX;
const Spoiler = window.Spoiler;

const CPP_CODE = `#include<bits/stdc++.h>
using namespace std;
using i64 = long long;

const int _N = 2e5;
vector<int> G[_N];
namespace shupou {
    int dfn[_N], tim = 0, dep[_N], sz[_N], fa[_N], top[_N], son[_N];
    void dfs_heavy(int u, int f) {
        dfn[u] = ++tim; sz[u] = 1; fa[u] = f; dep[u] = dep[f] + 1;
        for (auto& v : G[u]) {
            if (v == f) continue;
            dfs_heavy(v, u);
            sz[u] += sz[v];
            if (sz[v] > sz[son[u]]) son[u] = v;
        }
    }
    void dfs_top(int u, int f) {
        top[u] = f;
        if (son[u]) dfs_top(son[u], f);
        for (auto& v : G[u]) {
            if (v == fa[u] || v == son[u]) continue;
            dfs_top(v, v);
        }
    }
    int lca(int x, int y) {
        while (top[x] != top[y]) {
            if (dep[top[x]] >= dep[top[y]]) x = fa[top[x]];
            else y = fa[top[y]];
        }
        return dep[x] < dep[y] ? x : y;
    }
    void shupou(int root = 1) {
        dfs_heavy(root, 0);
        dfs_top(root, root);
    }
};
namespace xushu {
    int a[_N], pt = 0, npt = 0;
    vector<int> XG[_N], prev;
    int cmp(int x, int y) { return shupou::dfn[x] < shupou::dfn[y]; }
    void build(vector<int>& x) {
        pt = 0;
        for (auto& v : x) a[++pt] = v;
        sort(a + 1, a + pt + 1, cmp);
        npt = pt;
        for (int i = 2; i <= pt; i++) {
            int lca = shupou::lca(a[i], a[i - 1]);
            if (lca != a[i] && lca != a[i - 1]) a[++npt] = lca;
        }
        sort(a + 1, a + npt + 1);
        npt = unique(a + 1, a + npt + 1) - (a + 1);
        sort(a + 1, a + npt + 1, cmp);
        prev.push_back(a[1]);
        for (int i = 2; i <= npt; i++) {
            int lca = shupou::lca(a[i], a[i - 1]);
            XG[lca].push_back(a[i]);
            prev.push_back(a[i]);
        }
    }
    void clear() {
        for (auto& v : prev) XG[v].clear();
        prev.clear();
        pt = 0; npt = 0;
    }
};
bool red[_N];
int dfs(int u) {
    int ans = 0;
    for (auto& v : xushu::XG[u]) ans += dfs(v);
    if (red[u]) {
        for (auto& v : xushu::XG[u])
            if (red[v]) ans++;
    }
    else {
        int cnt = 0;
        for (auto& v : xushu::XG[u])//if current = not important city
            if (red[v]) cnt++;
        if (cnt > 1) ans++;//if we have >= 2 cities meaning we must break here
        if (cnt == 1) red[u] = true; //or else just make it red and just go up
    }
    return ans;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr); cout.tie(nullptr);

    int N; cin >> N;
    for (int i = 1; i <= N - 1; i++) {
        int u, v; cin >> u >> v;
        G[u].push_back(v);
        G[v].push_back(u);
    }
    shupou::shupou();
    int Q; cin >> Q;
    while (Q--) {
        int M; cin >> M;
        vector<int> p(M);
        bool neighbour = false;
        for (int i = 0; i < M; i++) {
            cin >> p[i];
            red[p[i]] = true;
        }
        for (int i = 0; i < M; i++)
            if (red[shupou::fa[p[i]]] == true)//if its father is red and current node is also red, it can never be colored
                neighbour = true;

        if (neighbour) { //if it is impossible to disconnect them
            cout << "-1\\n";
            for (int i = 0; i < M; i++) red[p[i]] = false;
            continue;
        }
        else {
            xushu::build(p); //build the virtual tree
            cout << dfs(xushu::a[1]) << '\\n'; //dfs from root of the virtual tree
            for (auto& x : xushu::prev) red[x] = false; //reset all to without color
            xushu::clear(); //clear the virtual tree
        }
    }
}
`;

function VirtualTreesPost() {
  return (
    <div className="post-prose">
      <p><a href="https://codeforces.com/problemset/problem/613/D" target="_blank" rel="noopener">Problem link ↗</a> — Codeforces 613D</p>

      <h2>Problem statement</h2>
      <p>Given a tree with <TeX tex="N" /> nodes. You are given <TeX tex="Q" /> queries. For each query, you are given an integer <TeX tex="K" /> and an array <TeX tex="\{a\}" /> of length <TeX tex="K" />.</p>
      <p>We will color all these nodes in <TeX tex="\{a\}" /> in red.</p>
      <TeX block tex="\sum_{i=1}^{Q}K_{i} \leq 10^5, \quad 1 \leq N,Q\leq 10^5" />
      <p>Enemies will try to disconnect these nodes by removing other nodes that are not in <TeX tex="\{a\}" />. Find minimum nodes (that are not in <TeX tex="\{a\}" />) removed in order to disconnect those nodes in <TeX tex="\{a\}" />. Queries are not permanent (the nodes destroyed will be reset after the query).</p>
      <p><em>Again, always try the problem before looking at the solution.</em></p>

      <Spoiler summary="Tags / Prerequisites">
        <p>HLD/binary lifting for finding LCA, DFS, virtual tree.</p>
      </Spoiler>

      <Spoiler summary="Hint 1">
        <p>Does every node from 1 to <TeX tex="N" /> matter in a query?</p>
      </Spoiler>

      <Spoiler summary="Hint 2">
        <p>Definitely not all nodes matter. Only the LCA of nodes in <TeX tex="\{a\}" /> and the nodes in <TeX tex="\{a\}" /> matters.</p>
      </Spoiler>

      <Spoiler summary="Hint 3">
        <p>This completely satisfies the condition of building virtual trees.</p>
      </Spoiler>

      <Spoiler summary="Hint 4">
        <p>If we traverse through the nodes from the root in the virtual tree, there will be three conditions:</p>
        <p>1) If we are at a non-red node and we have ≥2 children that is red?</p>
        <p>2) If we are at a non-red node and we have only 1 child that is red?</p>
        <p>3) If we are at a red node?</p>
      </Spoiler>

      <p>Are you able to find the full solution from the hints?</p>

      <Spoiler summary="Solution">
        <p>Let us build a virtual tree based on the nodes. There are many blogs that show how to do this. If you need a template of building a virtual tree, you can DM me for it.</p>
        <p>Let us DFS from the root of the virtual tree.</p>
        <p>1) If we are at a non-red node and we have ≥2 children that is red? This means that we should just break the node here.</p>
        <p>2) If we are at a non-red node and we have only 1 child that is red? We can simply color the current node red.</p>
        <p>3) If we are at a red node? From the second condition, we can simply count the number of children that are red and add it to the answer.</p>
      </Spoiler>

      <Spoiler summary="Code">
        <pre><code>{CPP_CODE}</code></pre>
      </Spoiler>

      <Spoiler summary="Feelings">
        <p>I've first heard about virtual trees around 3/4 months ago during a camp for preparation of IOI 2023. This is the first problem I've seen that is solved using virtual tree. Amazing problem (also introduction to virtual trees), but I used 4/5 hours on solving 1 problem only. It took me too long to implement virtual tree. Also, I think the problem rating is rated too high, maybe because virtual tree was not well known back then.</p>
      </Spoiler>

      <p>Hope you guys learnt something from this blog.</p>
      <p>Sorry for the large time between notes 3 and notes 4, I've been busy organizing a camp that is CP-related.</p>
    </div>
  );
}

Object.assign(window, { VirtualTreesPost });
