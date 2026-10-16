// blog-post-7.jsx — "CS2110 Notes: Computer Organization & Programming"
const TeX = window.TeX;

const PSEUDO_STACK = `push:
    ADD R6, R6, #-1   ; move stack pointer down
    STR R1, R6, #0    ; store value at top of stack

pop:
    LDR R1, R6, #0    ; load value from stack
    ADD R6, R6, #1    ; move stack pointer up`;

const PSEUDO_TRAP = `TRAP x0023   ; refers to x04A0, the character input service subroutine
             ; stores x0023 into the Trap Vector Table
             ; execution: loads instruction x0023 and loads x04A0
             ; (acts as a JSR Indirect)`;

const PSEUDO_KMAP = `Simplify this K-map: m3, m6, m7, m11, m13, m14, m15
Convert to binary: m3 -> 0011 -> fill 1 into A'B'CD (0011)

Result: BC + CD + ABD
(K-map wraps around: leftmost/rightmost columns and top/bottom rows connect)`;

function CS2110Post() {
  return (
    <div className="post-prose">
      <h2 id="jan-15">Jan 15 — Data Representation &amp; Overflow</h2>
      <p><strong>Layer structure:</strong> problems, algorithms, language, machine (ISA) architecture, microarchitecture, circuits, devices.</p>
      <p>Goal of the semester: build an LC-3 micro-computer that acts in the ISA layer. About: how is human-readable code interpreted by binary-based machines?</p>
      <p>Base-10 example: <TeX tex="541 = 5\times10^2 + 4\times10 + 1\times10^0" />. Base-2 example: <TeX tex="9 = 1\times2^3 + 1\times2^0" />.</p>
      <p><strong>Overflow:</strong> when there aren't enough bits to represent the result of a calculation.</p>
      <ul>
        <li>3-bit example: <TeX tex="101 + 100 = 1001" /> (4 bits).</li>
        <li>Representing <TeX tex="20+14" /> with 6 bits: range is −32 to 31. 34 is outside the range.</li>
        <li>Overflow ⟺ <TeX tex="C_{in}(\text{MSB}) \neq C_{out}(\text{MSB})" /></li>
        <li>Positive + negative → no overflow.</li>
      </ul>
      <p><strong>Signed notation:</strong> signed | magnitude — 0 for positive, 1 for negative.</p>
      <p><strong>3-bit 2's complement:</strong> range is −4 to 3. Inference: for <TeX tex="N" />-bit 2's complement, the range is <TeX tex="-2^{N-1}" /> to <TeX tex="2^{N-1}-1" />.</p>
      <p>Complement calculation: when overflow occurs in a complement calculation, ignore the overflow digit. Getting the complement: flip the bits and add 1. Example: <code>2 = 010</code>, <code>~010 + 1 = 110 = -2</code>.</p>

      <h2 id="jan-20a">Jan 20 — Conversions &amp; Fixed Point</h2>
      <p>Unsigned = all bits are positive (the first bit means value, not sign).</p>
      <p>Transfer from binary to decimal: flip → increment → add sign back.</p>
      <p>Easy transformation from binary to octal (groups of 3 bits) or hexadecimal (groups of 4 bits) — no sign extension needed.</p>
      <p><TeX tex="0.547_{10} = 5\times\tfrac{1}{10} + 4\times\tfrac{1}{10^2} + 7\times\tfrac{1}{10^3}" /><br />
      <TeX tex="0.101_2 = 1\times\tfrac12 + 0\times\tfrac1{2^2} + 1\times\tfrac1{2^3}" /></p>
      <p>Converting fractional values can only approximate the fractional part.</p>
      <p><strong>Fixed point (Q15.16):</strong> a 32-bit system — 1 bit for sign, 15 bits for the integer part, 16 bits for the fractional part.</p>
      <p><strong>Normalization:</strong> shift the decimal point left by <TeX tex="n" /> spaces, and multiply the result by <TeX tex="2^n" />. The value remains unchanged.</p>

      <h3>Jan 21 Lab — Binary / Hex Conversion Practice</h3>
      <p>Convert 158 to unsigned binary: <TeX tex="158 = 128+16+8+4+2 \to 10011110" /></p>
      <p>Convert <code>10110001</code> to decimal: <TeX tex="1+16+32+128 = 177" /></p>
      <p><code>10100100 − 01001101 = 11110001</code></p>
      <p>Binary <code>0b101111001</code>: <TeX tex="1+8+16+32+64+256 = 377" /></p>
      <p>Hex to binary: <code>0x9C = (1001)(1100) = 10011100</code></p>
      <p>Convert −41 to 8-bit 2's complement (<TeX tex="2^8 - 41" />): <TeX tex="41 = 32+8+1 \to 00101001 \to 11010110\,(+1) \to 11010111" /></p>
      <p>Range for <TeX tex="X" /> bits of 2's complement (<TeX tex="-2^{N-1}" /> to <TeX tex="2^{N-1}-1" />): 2 bits → −2 to 1; 4 bits → −8 to 7; 8 bits → −64 to 63 (per lab's worked convention).</p>

      <h2 id="jan-20b">Jan 20 — Logic Gates &amp; Boolean Algebra</h2>
      <p><strong>Logic gates:</strong> n-type transistor connects to ground; p-type transistor connects to power. Connected to both power and ground = short circuit 🔥. Connected to neither = floating/unknown voltage.</p>
      <p>Cascading combines logic gates at the transistor level into higher-level Boolean logic.</p>
      <p><strong>Addition as a logical operation:</strong> 3 inputs — <TeX tex="A, B, C_{in}" />; 2 outputs — <TeX tex="C_{out}" /> (carry to next bit) and <TeX tex="S" /> (current sum). Truth table ↔ expression ↔ circuit.</p>

      <h3>Jan 28 Lab — NAND/AND, K-Maps</h3>
      <p>NAND is easier to output 1; AND is easier to output 0 ("easier" meaning more paths to power/ground).</p>
      <p>You can't get a NAND3 gate by cascading two NAND2 gates (but AND, OR, and XOR can be), because:</p>
      <TeX block tex="\overline{\overline{A\cdot B}\cdot C} = \overline{(\overline A + \overline B)\cdot C} = \overline{\overline A+\overline B} + \overline C = A\cdot B + \overline C" />
      <p><TeX tex="(\overline A \cdot B) + (A \odot B) \to \text{XNOR}" />: 00→1, 10→0, 01→1, 11→1.</p>
      <p>Worked example: <TeX tex="A=0101" />, <TeX tex="B=1101" />. <TeX tex="A+B=0010" /> (no overflow); <TeX tex="A\cdot B=0101" />; <TeX tex="\overline A=1010" />.</p>
      <h3>Truth Table → K-Map</h3>
      <p><TeX tex="X" />: input combination that will never occur, or the output doesn't matter. Once you draw the table, group all the 1s with rectangles (0 can't be included):</p>
      <ol>
        <li>Max size (bigger the better)</li>
        <li>Dimensions must be powers of 2 (e.g. 1×4 or 2×2)</li>
        <li>Wraparound is allowed (rightmost and leftmost columns connect)</li>
      </ol>
      <p>Naming rule: row (P) + bits that are unchanged (e.g. <TeX tex="S_0S_1" /> and <TeX tex="S_0'S_1" /> give either X or 1, giving <TeX tex="PS_1" />, i.e. <TeX tex="P \cdot S_1" />).</p>
      <p><TeX tex="(\overline D\cdot\overline B) + (B\cdot D) + (C\cdot\overline A\cdot\overline B)" /></p>

      <h2 id="jan-29">Jan 29 — De Morgan's Laws, Gray Codes, Decoders/MUX</h2>
      <p><strong>De Morgan's Laws:</strong> invert inputs → swap the gate → invert output. <TeX tex="A\cdot\overline A = 0" />, <TeX tex="A+\overline A=1" />.</p>
      <p>Example: <TeX tex="\overline A\overline B\overline C + \overline A\overline BC + A\overline B\overline C + A\overline BC = \overline A\overline B(\overline C+C) + A\overline B(\overline C+C) = \overline A\overline B + A\overline B = (\overline A+A)\overline B = \overline B" /></p>
      <h3>Gray Codes &amp; K-Maps</h3>
      <p><code>00 → 01 → 11 → 10</code> — adjacent codes can only differ by one bit! Goal: capture all the 1s with rectangles whose side length is a power of 2.</p>
      <pre><code>{PSEUDO_KMAP}</code></pre>
      <h3>Decoders and Multiplexers</h3>
      <ul>
        <li>Selector bits: <TeX tex="S_1" /> = MSB, <TeX tex="S_0" /> = LSB.</li>
        <li>Decoders: no input → multiple outputs (<TeX tex="2^n" />, <TeX tex="n" /> = number of selector bits).</li>
        <li>Multiplexers (MUX): multiple inputs (<TeX tex="2^n" />) → one output.</li>
      </ul>

      <h2 id="feb-2">Feb 2 Lab — Signed Magnitude, IEEE 754, Bitmasks</h2>
      <p><strong>Signed magnitude:</strong> first bit = sign, remaining bits = value. Range (signed): <TeX tex="-2^{n-1}+1" /> to <TeX tex="2^{n-1}-1" />.</p>
      <p>Signed: fill with the sign (first) bit. Unsigned: fill with 0s. Carry-in = carry-out → no overflow.</p>
      <p><strong>IEEE 754:</strong> first bit = sign; second field = exponent (binary → decimal, result − 127); third field = mantissa (add an implicit 1 at the front, then binary → decimal).</p>
      <p><strong>Bitmask:</strong> index 0 from the right. <code>000 → 1</code> is NOR (<code>000 → 0</code> is OR); <code>111 → 0</code> is NAND (<code>111 → 1</code> is AND).</p>

      <h2 id="feb-3">Feb 3 — Sequential Logic</h2>
      <p><strong>Combinational logic circuit:</strong> fixed and fast, but not flexible — so we need a conditional component.</p>
      <p><strong>Sequential logic circuit:</strong> variable — able to store and access a value.</p>
      <h3>S-R Latch</h3>
      <p>S: set; R: reset. Built from two NAND gates, ultimately reaches a stable state. Same input always yields the same output. Even changing input S, the system remains stable — able to store a value.</p>
      <h3>Gated D Latch</h3>
      <p>Built on the RS latch. D: input data; WE: write enable. <TeX tex="WE=0" /> → unchanged; <TeX tex="WE=1" /> → Q follows D. Avoids the 00 RS conflict.</p>
      <h3>Memory</h3>
      <ul>
        <li>How many lines? <TeX tex="n" /> address bits ↔ <TeX tex="2^n" /> lines (address space).</li>
        <li>How many bits per line? Addressability.</li>
        <li>Identify the address line (e.g. <TeX tex="A[1:0]" />) → all 0 on other lines → only the selected line changes.</li>
        <li>Each multiplexer handles one bit (<TeX tex="D_2, D_1, D_0" />).</li>
      </ul>
      <h3>Finite State Machine (FSM)</h3>
      <p>States: nodes. Transitions: edges. Implemented as logic circuits (e.g. <code>next[1]</code>) or derived using a K-map.</p>
      <h3>The Clock</h3>
      <p>A signal whose value alternates between 0 and 1 — makes sure every circuit's outputs are stabilized before being used to calculate new inputs.</p>
      <h3>Flip-Flops</h3>
      <p>Clock + 2 D latches in series → flip-flop. One WE is 0 and the other WE is 1 (never open both at the same time!).</p>

      <h2 id="lec9-10">Lec 9–10 — Program Structure, Von Neumann, LC-3 Datapath</h2>
      <p><strong>Program structure:</strong> sequence (top to bottom), selection (execute only when a condition is true), iteration (loops).</p>
      <p><strong>Instruction cycle:</strong> (1) fetch the next instruction, (2) decode what it means/does, (3) execute the required actions, (4) store — update variables. This follows the <strong>Von Neumann architecture</strong>.</p>
      <h3>LC-3</h3>
      <p><strong>Memory &amp; registers:</strong></p>
      <ul>
        <li>Memory Address Register (MAR) + Memory Data Register (MDR).</li>
        <li>16-bit addressability → <TeX tex="2^{16}" /> lines of memory.</li>
        <li>The register file (8 registers).</li>
        <li>Program Counter (PC): holds the address of the next instruction.</li>
        <li>Instruction Register (IR): the address from PC is loaded into IR.</li>
        <li>NZP (negative/zero/positive): 3 bits, value comparison.</li>
      </ul>
      <p><strong>Processing units:</strong> Arithmetic Logic Unit (ALU), other processing elements (e.g. adder), finding the next instruction (<TeX tex="PC+1" />), sign extend (SEXT) &amp; zero extend (ZEXT).</p>
      <p><strong>Control units &amp; signals:</strong> the FSM holds microcode; multiplexers (PCMUX, ADDR1MUX, ADDR2MUX, MARMUX) pull signals based on instructions from the FSM; LD.REG, LD.PC, LD.MDR, LD.MAR are signals from the FSM.</p>
      <p><strong>Bus, gates &amp; connections:</strong> gates (GateMARMUX, GatePC, GateALU, GateMDR) send data to the bus and then to other components. Cannot open two gates at once — causes a short circuit. The clock, controlled by the control unit, syncs the different components.</p>
      <h3>Shared Bus</h3>
      <p>A tri-state buffer ensures only one source is effectively connected to the bus at a time. Enable = 0 → not connected; Enable = 1 → connected and passes the input to the bus.</p>
      <p>The FSM has states, which contain Register Transfer Language (RTL). The clock drives the transitions in the FSM.</p>
      <p><strong>Fetch (3 cycles):</strong> Gate__ transmits a value to the bus; LD.__ is the write-enable for registers to accept a new value; MEM.RW = 0 means we don't want to rewrite the data.</p>
      <p><strong>Decode (1 cycle):</strong> determine which set of steps to take based on the instruction loaded in the IR. Identify instructions by opcode (high four bits). Three categories: arithmetic-logical (often ALU-based), control flow (branch, jump — don't execute in sequence), data movement (between memory and registers), and traps/interrupts/exceptions (extra non-built-in instructions; error handling).</p>

      <h2 id="feb-16-18">Feb 16–18 — LC-3 Storage &amp; Addressing Modes</h2>
      <h3>Instructions (Feb 17)</h3>
      <ul>
        <li>Opcode: activates specific logic circuits in the ALU or control unit.</li>
        <li>Register: source registers (SR) and destination registers (DR), unsigned.</li>
        <li>Immediate values: "constants" in the operation (2's complement — positive, zero, or negative).</li>
        <li>Control bits: a 1-bit field tying into addressing modes.</li>
      </ul>
      <p><strong>Register vs. memory:</strong> registers are faster to access/update; memory has more capacity (<TeX tex="2^{16}" /> vs. 8) — load-store architecture.</p>
      <p><strong>LC-3 16-bit address space:</strong> <code>x0000–x3000</code>: system space &amp; supervisor stack (OS-managed, no access). <code>x3000–xFE00</code>: user space &amp; user stack. <code>xFE00–xFFFF</code>: I/O page (limited access). Problem: can't fit a 16-bit address and a 4-bit opcode in 16 bits.</p>
      <p><strong>PC-relative addressing:</strong> uses PC as a reference point to reach other memory locations. <code>LD</code>: memory → register. <code>ST</code>: register → memory. <code>LEA</code>: doesn't access memory (MDR) — only cares about the address, storing it into the register. <code>LDR</code>: base register. <code>LDI</code>: accesses memory twice (cycles 3 and 5 are similar) — helpful with linked structures.</p>
      <p><code>BR</code> (branch): uses the NZP condition-code register (.CC). If <TeX tex="BEN=1" /> → change PC by adding the offset. If <TeX tex="BEN=0" /> → do nothing, return to fetch. <code>JMP</code>: base register, unconditional.</p>
      <h3>Feb 16 Lab — Storage Components &amp; the Fetch Phase</h3>
      <p>Memory (MAR + MDR) is built from D latches (gated D flip-flops). MAR: input from bus, output to memory address lines. MDR: bidirectional — connects to both the bus and memory data lines. The FSM tells the LC-3 what to do and when, based on previous states &amp; instructions.</p>
      <p><strong>The storage components:</strong> PC (the pointer — holds the address of the next instruction), IR (the current work order — holds the binary code being executed), Registers R0–R7 (the "scratchpad" holding data being manipulated), MAR (the "address label" telling memory which row to look at), MDR (the "mailbox" holding data sent to/from memory).</p>
      <p><strong>Fetch phase:</strong></p>
      <ol>
        <li>FSM sends a signal to GatePC — the address of the next instruction flows onto the global bus.</li>
        <li>FSM simultaneously sends a signal to LD.MAR — the MAR grabs that address from the bus.</li>
        <li>The MAR tells memory "give me the data at this address" — memory puts that data into the MDR.</li>
        <li>FSM sends a signal to GateMDR — the instruction code (16 bits) flows onto the global bus.</li>
        <li>FSM sends a signal to LD.IR — the IR captures that code.</li>
        <li>FSM looks at the IR (specific bits) to decide what to do next (decode).</li>
      </ol>
      <h3>Feb 18 Lab — Von Neumann &amp; Addressing Modes Summary</h3>
      <p>Von Neumann architecture: data and instructions live in the same place. Addressing modes:</p>
      <ul>
        <li>PC-relative: <TeX tex="\text{mem}[PC^*+\text{PCoffset9}]" /> — <code>LD</code>, <code>ST</code></li>
        <li>Indirect: <TeX tex="\text{mem}[\text{mem}[PC^*+\text{PCoffset9}]]" /> — <code>LDI</code>, <code>STI</code></li>
        <li>Base + register offset: <TeX tex="\text{mem}[\text{BaseReg}+\text{offset6}]" /> — <code>LDR</code>, <code>STR</code></li>
      </ul>

      <h2 id="mar-3-5">Mar 3–5 — Assembly: Loops, Stack, Subroutines</h2>
      <h3>Mar 3, Lec 14 — Assembly Program</h3>
      <ul>
        <li><code>.fill</code>: put a 16-bit value into this memory location.</li>
        <li><code>.stringz</code>: store every character of the string into a separate memory location.</li>
        <li><code>HALT</code>: stop fetching new instructions.</li>
        <li><code>LD</code>: load a value from a memory address into a register.</li>
        <li><code>ST</code>: store a value from a register into a memory address.</li>
      </ul>
      <h3>Mar 5, Lec 15 — Control Flow &amp; the Stack</h3>
      <p>If/else-if/while/for = selection + iteration. <code>continue</code>: jump immediately to the next iteration → <code>BRnzp</code> header. Exit the loop: <code>BRnzp</code> done.</p>
      <p><strong>Stack:</strong></p>
      <pre><code>{PSEUDO_STACK}</code></pre>
      <ul>
        <li><strong>R6:</strong> stack pointer — stores the memory address of the top of the stack, changes constantly when pushing/popping.</li>
        <li><strong>R5:</strong> frame pointer — base of the current function's stack frame, stays fixed so offsets remain valid.</li>
        <li><strong>R7:</strong> saves the return address from JSR.</li>
      </ul>
      <p><strong>Caller responsibilities:</strong> push parameters, reserve space for the return value, execute JSR.<br />
      <strong>Callee responsibilities:</strong> save registers it will modify, save the previous frame pointer, create space for local variables, restore everything before returning.</p>
      <h3>Lab — Pseudo-ops &amp; the Toolchain</h3>
      <p>Pseudo-ops are instructions to the assembler, NOT executed by the CPU — resolved at compile time.</p>
      <p>Assembly code → assembler → machine code → CPU → execution.</p>
      <p><code>.ORIG x3000</code> / <code>VALUE .FILL 0</code> means <code>VALUE = x3000</code>, <code>mem[x3000] = 0</code>.</p>
      <p><code>LEA</code> + <code>LDR</code> can simulate <code>LD</code>.</p>

      <h2 id="mar-10-16">Mar 10–16 — Interrupts, Traps &amp; Exceptions</h2>
      <p><strong>Program discontinuities &amp; OS services</strong> — three fundamental categories, including interrupts (when the program is required to pause or relinquish resources).</p>
      <p><strong>Indirection:</strong></p>
      <pre><code>{PSEUDO_TRAP}</code></pre>
      <p>Interrupts can themselves be interrupted (qwq). <TeX tex="INT=1" /> means the interruption will be executed. Use <code>RTI</code> to restore PC, R6, and PSR.</p>
      <h3>Mar 16 Lab — Stack, Revisited</h3>
      <pre><code>{PSEUDO_STACK}</code></pre>
      <p>The stack grows downward.</p>

      <h2 id="mar-17-19">Mar 17–19 — Intro to C</h2>
      <p><code>&amp;</code>: bitwise. <code>&amp;&amp;</code>: logical. False = 0; True = 1 (everything other than 0). C is the lowest high-level language that still interacts directly with hardware.</p>
      <p><code>if (u == 5)</code>: a boolean expression (u equals 5 → TRUE). <code>if (u = 5)</code>: an assignment (5 is truthy → TRUE).</p>
      <h3>Mar 19 — Type &amp; Storage Class Qualifiers</h3>
      <p>Compile with <code>gcc name.c</code>, then run <code>./a.out</code>. What if we use <code>const int storage_place = 0</code> in <code>main</code>? Error — because we then tried to change the value (<code>keep_moving = 21</code>) inside <code>main</code>.</p>
      <p><strong>Type qualifiers:</strong></p>
      <ol>
        <li><code>const</code>: fine as long as you don't change the value.</li>
        <li><code>volatile</code>: the compiler may not optimize references to this variable (e.g. a device register that can change value asynchronously) — meaning it might change without the compiler knowing (display, keyboard registers).</li>
        <li><code>restrict</code>: for the lifetime of a pointer, only that pointer (or a value directly derived from it) may be used to access the object it points to. Allows better optimization — this pointer is the only "door" to the value, like only 1 door to the locker.</li>
      </ol>
      <p><strong>Storage class qualifiers:</strong> <code>extern</code> — go to that file and look for it (it's an address). <code>register</code> — a hint to the compiler to store a local variable in a CPU register for faster access, rather than regular memory.</p>
      <p>For BSS (uninitialized data), a specific structure is used (<code>static</code>). Why declare <code>void f(int)</code> ahead of use? Because C compiles top to bottom — without the declaration it errors.</p>
      <p>Rule of thumb: if you can't find (declare) something within the same scope, look at the parent scope. A block is defined by <code>{"{ // code }"}</code>, and trying to modify a <code>const</code> inside it errors out (won't look above).</p>

      <h2 id="mar-30">Lab 3/30 — Compilation Pipeline &amp; Pointer Declarations</h2>
      <p><strong>Compilation of a C program:</strong></p>
      <ol>
        <li>Converts C to assembly (compiling).</li>
        <li>Assembly → machine code (assembling).</li>
        <li>Alters source code based on compiler-defined directives, e.g. <code>#include</code> (preprocessing).</li>
        <li>Combines machine code &amp; other files &amp; libraries into an executable (linking).</li>
      </ol>
      <h3>Processor Directives</h3>
      <p>You can almost replace anything with <code>#define</code> — it's replaced directly with its value. Another example, <code>#if</code>/<code>#else</code>/<code>#endif</code>:</p>
      <pre><code>{"#if VALUE   // checks if CONSTANT val == 0\n// code (only one branch is visible to the compiler)\n#else\n// code\n#endif"}</code></pre>
      <p><code>printf()</code>: <code>%d</code> → int, <code>%x</code> → hex (int), <code>%c</code> → char, <code>%f</code> → float, <code>%s</code> → string, <code>%p</code> → pointer (for debugging).</p>
      <p>Note: there are no <em>primitive</em> datatypes in C — they are <em>basic</em> datatypes, with qualifiers <code>const</code>, <code>volatile</code>, and <code>restrict</code>.</p>
      <p>Why aren't <code>short</code> &amp; <code>long</code> "basic"? <code>short int</code> and <code>long int</code> (or <code>long long</code>) are completely different types from <code>int</code> itself.</p>
      <p><code>char</code> is only 1 byte (all other datatypes are hardware-determined — <code>char</code> has <code>CHAR_BITS</code>, not necessarily 8 bits). Printing an <code>int</code> with <code>%f</code> gives <code>0.00000000</code>. To find the number of bits: <code>sizeof TYPE</code>.</p>
      <p><code>#define SUM(a) ((a) + (a))</code> fails when calling it with <code>a++</code> or a function returning random numbers (two different evaluations).</p>
      <h3>Pointer Declaration &amp; Parsing</h3>
      <p><strong>Declaration:</strong> <code>int* a, b, c</code> — only <code>a</code> is a pointer! Use <code>int *a, *b, *c</code> to make all three pointers.</p>
      <p><strong>Structure:</strong> (i) uses the base type (or struct or typedef); (ii) each declarator is based on the base type, but stands alone.</p>
      <p><strong>Parsing:</strong> (i) apply precedence in the order <code>[]</code>, <code>()</code>, then <code>*</code>; (ii) read the declaration from the inside out.</p>
      <p>e.g. <code>int *(**f)()</code> → <code>*(</code>pointer to a pointer<code>)</code> <code>f()</code> → <code>f</code> = pointer to a pointer to a function returning a pointer to <code>int</code>.</p>
      <p>e.g. <code>int *(*f[])()</code> → <code>f</code> is an array of pointers to functions that return a pointer to an <code>int</code>.</p>
      <p><code>find_next() → ref-work → pointer → int value</code></p>
    </div>
  );
}

const CS2110_TOC = [
  { id: "jan-15", label: "Data Representation & Overflow" },
  { id: "jan-20a", label: "Conversions & Fixed Point" },
  { id: "jan-20b", label: "Logic Gates & Boolean Algebra" },
  { id: "jan-29", label: "De Morgan's, Gray Codes, MUX" },
  { id: "feb-2", label: "Signed Magnitude & IEEE 754" },
  { id: "feb-3", label: "Sequential Logic & FSMs" },
  { id: "lec9-10", label: "Von Neumann & LC-3 Datapath" },
  { id: "feb-16-18", label: "LC-3 Storage & Addressing" },
  { id: "mar-3-5", label: "Assembly: Loops, Stack, Subroutines" },
  { id: "mar-10-16", label: "Interrupts, Traps & Exceptions" },
  { id: "mar-17-19", label: "Intro to C & Qualifiers" },
  { id: "mar-30", label: "Compilation & Pointer Parsing" },
];

Object.assign(window, { CS2110Post, CS2110_TOC });
