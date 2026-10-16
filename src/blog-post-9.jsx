// blog-post-9.jsx — "Coding Tricks I Keep Reusing"

const TRICK1_BEFORE = `for (int i = 1; i <= N; i++) {
    // bla bla
    if (i == N) cout << "\\n";
    else cout << " ";
}`;

const TRICK1_AFTER = `for (int i = 1; i <= N; i++) {
    // bla bla
    cout << " \\n"[i == N];
}`;

const TRICK2_BEFORE = `for (int i = 1; i <= N; i++) {
    if (i is odd) {
        dp[0][] initialize
        dp[0] = ...
    }
    else { // i is even
        dp[1][] initialize
        dp[1] = ...
    }
}`;

const TRICK2_AFTER = `for (int i = 1; i <= N; i++) {
    int state = i & 1; // 0 or 1
    dp[state][] initialize
    dp[state][] = dp[state ^ 1] // XOR 1 to swap bit
}`;

function CodingTricksPost() {
  return (
    <div className="post-prose">
      <p>Small stuff I keep reaching for, mostly in competitive programming. Not deep, just saves typing and cuts down on bugs.</p>

      <h3 id="trick-1">1. Index a string literal instead of branching on a separator</h3>
      <p>Printing a separator that's a space everywhere except the last element is a very common pattern. The naive way is an if/else:</p>
      <pre><code>{TRICK1_BEFORE}</code></pre>
      <p>You can collapse this into a string literal indexed by the boolean, since <code>" \n"</code> is a two-character string and a bool converts to <code>0</code> or <code>1</code>:</p>
      <pre><code>{TRICK1_AFTER}</code></pre>
      <p>Same idea works for anything with exactly two outcomes — <code>"NO\nYES\n"[cond]</code>-style tricks, picking between two chars, etc. Careful with it in real production code — it's a one-liner for contests, not something I'd want to read at 2am in a codebase I don't own.</p>

      <h3 id="trick-2">2. Rolling DP with a 2-slot array instead of parity branches</h3>
      <p>When a DP only ever needs the previous layer and the current one, you don't need to keep the full table — just two rows, alternating. The branch-on-parity version works but reads worse the more you add to it:</p>
      <pre><code>{TRICK2_BEFORE}</code></pre>
      <p>Instead, compute the state once with <code>i &amp; 1</code>, and flip to the other slot with <code>state ^ 1</code>:</p>
      <pre><code>{TRICK2_AFTER}</code></pre>
      <p>The XOR is the part people forget — <code>1 - state</code> works too, but <code>state ^ 1</code> is the idiom, and it generalizes if you ever go from a 2-slot roll to something bitmask-y.</p>

      <p>Will add to this post as I run into more.</p>
    </div>
  );
}

Object.assign(window, { CodingTricksPost });
