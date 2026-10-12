---
theme: default
colorSchema: light
title: Rust
info: ""
drawings:
  persist: false
transition: none
comark: true
routerMode: hash
---

# Rust

CS 463

Slide credit: Michael Hicks CMSC 330

<!--
Speaker notes go here.
-->

---
layout: two-cols-header
---

# What choice do programmers have?

::left::

**C/C++**

- Type-unsafe

- Low level control

- Performance over safety and ease of use

- Manual memory management
  - e.g., with `malloc`/`free`

::right::

**Haskell, Java, Go, Ruby…**

- Type safe

- High level, less control

- Ease-of-use and safety over performance

- Auto memory management via garbage collection
  - No explicit `malloc`/`free`

<style>
.two-cols-header {
  grid-template-columns: 45% 55%;
}
</style>

---

# Rust: Type-safe (and Thread-safe), and Fast

- A Mozilla-sponsored, public project since 2010
  - Started in 2006 by Graydon Hoare while at Mozilla

- Most loved programming language in Stack Overflow annual surveys every year from 2016 through 2021

- Key properties: Type safety, and no data races, despite use of concurrency and manual memory management

---

# Features of Rust

Like Haskell
- Variables are immutable by default
- Data types and pattern matching
- First-class functions

&nbsp;
- Type inference
  - No need to write types for local variables
- Generics (aka parametric polymorphism)
- Traits as core of object(-like) system
- Lifetimes and Ownership
  - Key feature for ensuring safety
- Efficient C bindings

> Takes ideas from functional and OO languages, and recent research

---

# Rust in the Real World

- [Modern command-line tools rewritten in Rust](https://inrust.dev/)
  - `ls` → `eza`, `cat` → `bat`, `find` → `fd`, `grep` → `ripgrep`

- [OpenAI Codex CLI](https://github.com/openai/codex)
  <img src="/images/codex-language-breakdown.png" alt="Codex repository language breakdown: Rust 97.3%, Python 2.2%, Starlark 0.2%, TypeScript 0.1%, PowerShell 0.1%, Shell 0.1%" width="175" class="mt-3" />

- [Rust in **Android**: move fast and fix things](https://blog.google/security/rust-in-android-move-fast-fix-things/) (Nov. 2025)

- [Writing **Linux kernel** code in Rust is no longer experimental](https://lwn.net/Articles/1050174/) (Dec. 2025)

- [Rust Is Tier-1 Language at **Microsoft**](https://rustfoundation.org/media/guest-post-rust-is-tier-1-language-at-microsoft/) (Sep. 2026)
  - Alongside C++, C#, and TypeScript

---
layout: two-cols-header
---

# Information on Rust

::left::

<img src="/images/rust-book-cover.jpg" alt="The Rust Programming Language book cover" class="h-80 max-w-full object-contain" />

::right::

- Rust book free online
  - https://doc.rust-lang.org/book/
  - **We will follow it in lectures**

- More references via Rust site
  - https://doc.rust-lang.org/stable/

- Standard library documentation
  - https://docs.rs/std/

- Rust Playground
  - https://play.rust-lang.org/

<style>
.two-cols-header {
  grid-template-columns: 30% 70%;
}
</style>

---

# Installing Rust

- Instructions: https://rust-lang.org/tools/install/

- On Mac, Linux, or WSL, open a terminal and run
    ```sh
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    ```

- On Windows, download and run `rustup-init.exe`
  - [Download rustup-init.exe for x86_64](https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe)

<!--
here's the resources
-->

---
hide: true
---

# Rust compiler, build system (demo)

- Rust programs can be compiled using `rustc`
  - Source files end in suffix `.rs`
  - Compilation, by default, produces an executable
    - No `-c` option

- Preferred: Use the `cargo` package manager
  - Will invoke `rustc` as needed to build files
  - Will download and build dependencies
  - Based on a `.toml` file and `.lock` file
    - You won't have to mess with these for this class

---
hide: true
---

# Using rustc (demo) (hide?)

- Compiling and running a program

`hello.rs`:

```rust
fn main() {
    println!("Hello, world!")
}
```

```shellsession
$ rustc hello.rs
$ ./hello
Hello, world!
```

---
layout: two-cols-header
---

# Build system: cargo (demo)

::left::

Make a project, build it, run it

```shellsession
$ cargo new hello
$ cd hello
$ eza -T
.
├── Cargo.toml
└── src
    └── main.rs
$ cargo build
   Compiling hello v0.1.0 (/path/to/hello)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.64s
$ ./target/debug/hello
Hello, world!
$ # or
$ cargo run
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.00s
     Running `/another/path/to/hello`
Hello, world!
```

::right::

`src/main.rs`:

```rust
fn main() {
    println!("Hello, world!")
}
```

> We can use cargo to run tests too; will discuss later.

[More on Cargo](https://doc.rust-lang.org/stable/cargo/getting-started/first-steps.html)

<!--
todo: quick subcommand summary
-->

---
layout: image-right-full
image: /images/rust-playground.png
alt: Rust Playground editor and execution output showing Hello, world!
---

# Rust, interactively

- Rust is a compiled language and has no REPL like Python or Haskell

- There is an in-browser execution environment
  - https://play.rust-lang.org/

---
hide: true
---

# Rust Documentation

- Rust documentation is a good reference, and way to learn
  - https://doc.rust-lang.org/stable/

- This contains links to
  - the Rust Book (on which most of our slides are based),
  - the reference manual, and
  - short manuals on the compiler, cargo, and more

---
layout: section
---

# Rust Basics

Chapter 3

---
layout: default
---

# Factorial example

<RustPlayground>

```rust
fn fact(n: u32) -> u32 {
    if n == 0 {
        1
    } else {
        let x = fact(n - 1);
        n * x
    }
}

fn main() {
    let res = fact(6);
    println!("fact(6) = {res}");
}
```

</RustPlayground>

<!--
introduce functions, argument and return type, last expression as value, main function, print
-->

---

# If expressions

<RustPlayground>

```rust
fn main() {
    let n = 5;
    if n < 0 {
        println!("{n} is negative");
    } else if n > 0 {
        println!("{n} is positive");
    } else {
        println!("{n} is zero");
    }

    let x = if n < 0 {
        10
    } else {
        20
        // "a"
    };
    println!("x = {x:?}");
}
```

</RustPlayground>

---

# Let statements

<RustPlayground>

```rust
fn main() {
    let x = 5;              // Type inferred as i32.
    println!("x = {}", x);  // printf-style formatting

    // Cannot assign to an immutable variable.
    // x = x + 1;

    // Shadow the earlier binding.
    let x = "hello";
    println!("shadowed: x = {}\n", x);

    // Explicit type annotation OK.
    let a: i32 = 5;
    println!("a = {}", a);

    // Assigning to a variable only allowed if mut
    let mut a = 5;
    a = a + 1;
    println!("mutable: a = {}", a);
}
```

</RustPlayground>

<!--
shadowing, type annotation, mut
-->

---

# Quiz 1: What does this print?

<RustPlayground>

```rust
/* A. 6
 * B. 7
 * C. 5
 * D. Error
 */

fn main() {
    let x = 6;
    let y = "hi";
    if x == 5 { y } else { 5 };
    println!("{}", 7);
}
```

</RustPlayground>

---

# Quiz 2: What does this print?

<RustPlayground>

```rust
/* A. 6
 * B. true
 * C. false
 * D. error
 */

#[allow(warnings)]
fn main() {
    let x = 6;
    let y = 4;
    let x = 8;
    println!("{}", x == 10 - y);
}
```

</RustPlayground>

---

# Quiz 3: What does this print?

<RustPlayground>

```rust
/* A. 1
 * B. 6
 * C. 0
 * D. error
 */

#[allow(warnings)]
fn main() {
    let mut x = 1;
    for i in 1..6 {
        let x = x + 1;
    }
    println!("{}", x);
}
```

</RustPlayground>

---
layout: two-cols-header
---

# Data: Scalar Types

::left::

- Integers
  - Signed: `i8`, `i16`, `i32`, `i64`
  - Unsigned: `u8`, `u16`, `u32`, `u64`
  - `isize`, `usize`: machine word size

- Floating point numbers
  - `f32`, `f64`

- Defaults (from inference): `i32`, `f64`

::right::

- Characters (unicode)
  - `char`

- Booleans
  - `bool` = \{ `true`, `false` }

---

# Compound Data: Tuples

- n-tuple type `(t1, …, tn)`

  - unit `()` is just the 0-tuple
  
- n-tuple expression `(e1, …, en)`

- Accessed by pattern matching or like a record field (`tuple.0`)

```rust
let tuple = ("hello", 5, 'c');

assert_eq!(tuple.0, "hello");

let (x, y, z) = tuple;
```

---

# Compound Data: Tuples

<RustPlayground>

```rust
// Distance between two points pa: (x1, y1) and pb: (x2, y2).
fn dist(pa: (f64, f64), pb: (f64, f64)) -> f64 {
    let (ax, ay) = pa;
    let bx = pb.0;
    let by = pb.1;
    let dx = ax - bx;
    let dy = ay - by;
    (dx * dx + dy * dy).sqrt()
}

fn main() {
    println!("{}", dist((0.0, 0.0), (3.0, 4.0)));
}
```

</RustPlayground>

---

# Compound Data: Fixed-length Arrays

<RustPlayground>

```rust
#[allow(warnings, unconditional_panic)]
fn main() {
    // Create an array
    let nums: [i32; 3] = [1, 2, 3];
    let strs = ["Monday", "Tuesday", "Wednesday"];

    // Index into the array
    let x = nums[0];
    let s = strs[1];
    println!("nums[0] = {x}; strs[1] = {s}\n");

    // Only mutable arrays can be modified
    let mut xs = [1, 2, 3];
    xs[0] = 1;
    println!("xs = {xs:?}");

    // out-of-bounds panic
    // let y = xs[4];
}
```

</RustPlayground>

---

# Arrays: Iteration

* Rust provides a way to iterate over collections, including arrays.
* `a.iter()` produces an iterator, like a Java iterator
  * `for` calls `.next()` on the iterator until no elements are left

<RustPlayground top="187px">

```rust
fn main() {
    let a = [10, 20, 30, 40, 50];
    for element in a.iter() {
        println!("the value is: {}", element);
    }
}
```

</RustPlayground>

---

# Quiz 4: Will this function type check?

<RustPlayground>

```rust
// A. Yes
// B. No

fn f(n: [u32]) -> u32 {
    n[0]
}

fn main() {}
```

</RustPlayground>

---

# Testing

- In any language, there is the need to test code
- In most languages, testing requires extra libraries:
  - JUnit in Java, HUnit in Haskell
- Testing in Rust is a first-class citizen!
  - The testing framework is built into cargo

---

# Unit Testing in Rust

- Unit testing is for local or private functions
  - Put such tests in the same file as your code
- Use `assert!` to test that something is true
- Use `assert_eq!` to test that two things that implement the `PartialEq` trait are equal
  - E.g., integers, booleans, arrays, etc.

<RustPlayground top="240px">

```rust
pub fn my_function() -> i32 { 4 }

#[cfg(test)] // Include this module when compiling tests.
mod tests {
    use super::my_function;

    #[test] // Mark this function as a test.
    fn it_works() {
        assert_eq!(my_function(), 4);
    }
}
```

</RustPlayground>

---

# Running Tests

- `cargo test` runs all of your tests
- `cargo test s` runs all tests that contain `s` in the name
- By default, console output from passing tests is hidden
  - Use `cargo test -- --nocapture` to show it

---
layout: section
---

# Ownership

Chapter 4

---

# Memory: the Stack and the Heap

- The stack
  - Constant-time, automatic allocation and deallocation
  - Data size and lifetime must be known at compile time
    - Function parameters and locals of known (constant) size

<v-clicks>

- The heap
  - Dynamically sized data, with non-fixed lifetime
    - Slightly slower to access than stack data: via a pointer

- Memory management
  - Manual deallocation (C/C++): low overhead, but opportunities for devastating bugs
    - Dangling pointers and double frees are instances of memory corruption
  - Garbage collection (Java, Haskell): automatic deallocation, adds space/time overhead

</v-clicks>

---
layout: two-cols-header
---

# Memory: the Stack and the Heap

::left::

**C**

```c
char *p = malloc(10);
// ...
free(p);
```

<v-click>

**Java**

```java
String p = new String("hello");
// ...
p = null; // GC will collect later
```

`p` is removed from the stack when the function terminates.

<Arrow x1="315" y1="331" x2="648" y2="322" width="2.5" color="#ef4444" />

</v-click>

::right::

<img src="/images/ownership-stack-heap.svg" alt="A pointer p on the stack refers to allocated data on the heap" class="h-70 mx-auto" />

---

# Memory Management Errors (in C)

- May forget to free memory (**memory leak**)

```c
{
    int *x = (int *) malloc(sizeof(int));
}
```

<v-click>

- May retain a pointer to freed memory (**dangling pointer**)

```c
{
    int *x = (int *) malloc(sizeof(int));
    free(x);
    *x = 5; /* oops! */
}
```

</v-click>

<v-click>

- May try to free something twice (**double free**)

```c
{ 
    int *x = (int *) malloc(sizeof(int));
    free(x);
    free(x);
}
```

</v-click>

<!--
these errors may be obvious in small examples, but can be subtle in large programs
-->

---

# Rust: GC-less Memory Management, Safely

- Rust's heap memory is managed without garbage collection
- Type checking ensures no dangling pointers or double frees
  - Unsafe idioms are disallowed in safe Rust
  - Memory leaks are not prevented (not a memory-safety problem)

- Key features of Rust that ensure safety: **ownership and lifetimes**
  - Data has a single owner. Immutable aliases are OK, but mutation only via the owner or a single mutable reference
  - How long data is alive is determined by a lifetime

---
layout: two-cols-header
---

# Memory: the Stack and the Heap

::left::

**Rust**

```rust
{
    let p = String::from("hello");
    // ...
}
```

- Heap data is freed when the owner `p` goes out of scope
- No manual `free`, no garbage collection

`p` is removed from the stack when the function terminates.

::right::

<img src="/images/ownership-stack-heap.svg" alt="The owner p on the stack refers to String data on the heap" class="h-70 mx-auto" />

<style>
.two-cols-header {
  grid-template-columns: 55% 45%;
}
</style>

---
layout: section
---

# Functional language features

Chapter 13
