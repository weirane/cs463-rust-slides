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

<div class="text-xs">

<!--Slide source: https://github.com/weirane/cs463-rust-slides/ <br/>-->
Interactive site: <https://mason.gmu.edu/~rwang29/talks/cs463-rust/> <br/>
PDF: <a href="./5.rust.pdf">5.rust.pdf</a> <br/>
Slides built on: Michael Hicks CMSC 330

</div>

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

<div v-click class="absolute bottom-30 left-0 w-full text-center text-2xl">
Something in between ... ?
</div>

<style>
.two-cols-header {
  grid-template-columns: 45% 55%;
}
</style>

<!--
at this point you've probably seen several programming languages, and they have different characteristics and can be used in different fields.
java and haskell let us work without explicitly allocating and freeing memory

[click]
can we keep c's performance and control, but also have safety of java and haskell?
-->

---

# Rust: Type-safe (and Thread-safe), and Fast

- Started in 2006 by Graydon Hoare while at Mozilla
  - A Mozilla-sponsored, public project since 2010
  - Rust 1.0 released in 2015
  - Rust Foundation established in 2021

- Most loved/admired programming language in Stack Overflow annual surveys (2016 --- 2025)

- Key properties: Type safety, and no data races, despite use of concurrency and manual memory management

---
hide: true
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

- Installation guide
  - https://rust-lang.org/tools/install/

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
hide: true
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
layout: two-cols-header
---

# Factorial example

::left::

Rust

```rust {all|1|2-7|3,6|10-13|12|all}
fn fact(n: u32) -> u32 {   // function definition
    if n == 0 {
        1
    } else {
        let x = fact(n - 1);
        n * x              // last expr in a block is its value
    }
}

fn main() {                // main function, entry point
    let res = fact(6);
    println!("fact(6) = {res}");
}
```

<v-click>

```
fact(6) = 720
```

</v-click>

::right::

Haskell

```haskell
fact :: Integer -> Integer
fact n =
    if n == 0 then
        1
    else
        let x = fact (n - 1)
        in n * x


main :: IO ()
main = do
    let res = fact 6
    putStrLn ("fact(6) = " ++ show res)
```

<!--
let's start with the factorial function. you may notice some similarities with haskell, because rust also borrows a lot of ideas from functional languages

[click]
functions: fn, takes unsigned 32bit, returns unsigned 32 bit integer

[click]
if expression

[click]
no returns? last expr in a block is its value

[click]
main function, entry point

[click]
println! macro, braces inserts value of res
-->

---

# If expressions

```rust {all|3-10|12-18}
fn main() {
    let n = 5;
    // if statements
    if n < 0 {
        println!("{n} is negative");
    } else if n > 0 {
        println!("{n} is positive");
    } else {
        println!("{n} is zero");
    }

    // if expressions
    let x = if n < 0 {
        10
    } else {
        "a" // compile error
    };
    println!("x = {x:?}");
}
```

<div v-click="2" class="absolute left-80 top-85 z-10 text-sm">

$$
\textcolor{#00ad45}{\text{Ty-if}}\quad
\frac{
  \Gamma \vdash a : \mathbb{B}
  \qquad \Gamma \vdash b : T
  \qquad \Gamma \vdash c : T
}{
  \Gamma \vdash \text{if}\ a\ b\ c : T
}
$$

</div>

<!--
let's go back to if expressions

[click]
rust supports regular if statements you find in java and many other languages. the first example looks familiar: we check n and print one of the messages

[click]
rust's if can also produce a value. so we need to make sure its branches have the same type.
-->

---

# Let statements

<RustPlayground>

```rust
fn main() {
    let x = 5;              // Type inferred as i32.
    println!("x = {}", x);

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
we used let to give the result of an expression a name. let's look at some of the features of let statements

if you just write "let x" again, it will create a new variable shadow the previous one

shadowing, type annotation, mut
-->

---

# While loops

- Works just like the `while` loops in other languages
- Use `mut` when the loop updates a variable

<RustPlayground top="160px">

```rust
fn main() {
    let mut number = 3;

    while number != 0 {
        println!("{number}!");
        number -= 1;
    }

    println!("LIFTOFF!!!");
}
```

</RustPlayground>

<!--
one place where mut is useful is in while loops. we need to mut to define the loop variable
-->

---
clicks: 1
---

# Quiz 1: What does this print?

A. 6 <br/>
B. hi <br/>
C. 5 <br/>
<span :class="{ 'font-bold': $clicks >= 1 }">D. Error</span> <v-click><span class="ml-[16px]">✅</span></v-click>

<RustPlayground top="200px">

```rust
fn main() {
    let x = 6;
    let y = "hi";
    let z = if x == 5 { y } else { 5 };
    println!("{}", z);
}
```

</RustPlayground>

<!--
Let's check our understanding with a few short examples. Take a moment to think before we reveal the answer.
-->

---
clicks: 1
---

# Quiz 2: What does this print?

A. 6 <br/>
B. true <br/>
<span :class="{ 'font-bold': $clicks >= 1 }">C. false</span> <v-click><span class="ml-[19px]">✅</span></v-click> <br/>
D. error

<RustPlayground top="200px">

```rust
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
clicks: 1
---

# Quiz 3: What does this print?

<span :class="{ 'font-bold': $clicks >= 1 }">A. 1</span> <v-click><span class="ml-[47px]">✅</span></v-click> <br/>
B. 6 <br/>
C. 0 <br/>
D. error

<RustPlayground top="200px">

```rust
#[allow(warnings)]
fn main() {
    let mut x = 1;
    for i in 1..6 {  // 1..6 --> 1, 2, 3, 4, 5
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
  - Signed: `i8`, `i16`, `i32`, `i64`, `i128`
  - Unsigned: `u8`, `u16`, `u32`, `u64`, `u128`
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
    xs[0] = -1;
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
layout: two-cols-header
---

# Compound Data: Strings

- `"hello"` is a string literal, with type `&str` (a borrowed string slice)
- `String` stores owned, growable UTF-8 encoded text
- Unlike Java, Rust `String`s are mutable (if defined with `let mut`)

::left::

Rust

```rust
let mut s = String::from("Hello");
s.push_str(", world!");
println!("{s}");
```

```
Hello, world!
```

::right::

Java

```java
String s = "Hello";
s.concat(", world!");
System.out.println(s);
```

```
Hello
```

<!--
and let's quickly compare strings in rust and java.

In Java, String objects are immutable. Calling concat returns a new String.

but in Rust, strings are mutable. push_str modifies the existing String. We need mut because we are changing its contents.

We'll explain borrowing in more detail later.
-->

---
clicks: 1
---

# Quiz 4: Will this function type check?

A. Yes <br/>
<span :class="{ 'font-bold': $clicks >= 1 }">B. No</span> <v-click><span class="ml-[21px]">✅</span></v-click>

<RustPlayground top="150px">

```rust
fn f(n: [u32]) -> u32 {
    n[0]
}

fn main() {}
```

</RustPlayground>

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

[More on Cargo](https://doc.rust-lang.org/stable/cargo/getting-started/first-steps.html)

&nbsp;
* `cargo new <name>`: create a project
* `cargo build`: build the project
* `cargo run`: build & run the project
* `cargo test`: run tests

<!--
unset CARGO_TARGET_DIR
-->

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
  - Can put such tests in the same file as your code
- Use `assert!` to test that something is true
- Use `assert_eq!` to test that two things are equal (need the `PartialEq` trait)
  - E.g., integers, booleans, arrays, etc.

<RustPlayground top="240px">

```rust
pub fn my_function() -> i32 { 4 }

#[cfg(test)]
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

<!--
so why was rust created? the goal of creating rust is to have a language that is as fast as c, but also safe like haskell and java. so we need to understand how rust manages memory, and how it ensures safety
-->

---
layout: two-cols-header
---

# Memory: the Stack and the Heap

::left::

- The stack
  - Constant-time, automatic allocation and deallocation
  - Data size and lifetime must be known at compile time
    - Function parameters and locals of known (constant) size
    - Fixed lifetime

<v-click>

&nbsp;
- The heap
  - Dynamically sized data
    - Slightly slower to access than stack data: via a pointer
    - Non-fixed lifetime

</v-click>

::right::

<img src="/images/ownership-stack-heap.svg" alt="A pointer p on the stack refers to allocated data on the heap" class="h-70 mx-auto" />

<style>
.two-cols-header {
  grid-template-columns: 60% 40%;
}
</style>

<!--
first, let's distinguish two places data can live.

we know when to reclaim the local pointer. But when should we reclaim the heap data?
-->

---
layout: two-cols-header
---

# Memory Management

::left::

**Java**
- Garbage collection (Java, Haskell): automatic deallocation, adds space/time overhead

```java
String p = new String("hello");
// ...
p = null; // GC will collect this later
```

`p` is removed from the stack when the function terminates.

<Arrow x1="365" y1="247" x2="668" y2="312" width="1.5" color="#ef4444" />

::right::

<img src="/images/ownership-stack-heap.svg" alt="A pointer p on the stack refers to allocated data on the heap" class="h-70 mx-auto" />

<style>
.two-cols-header {
  grid-template-columns: 55% 45%;
}
</style>

<!--
the other way is to have a garbage collector

Here, assigning null removes this reference. If no other references keep the object reachable, it becomes eligible for collection. That doesn’t mean it is collected immediately.
-->

---
layout: two-cols-header
---

# Memory Management

::left::

**C**

- Manual deallocation (C/C++): low overhead, but opportunities for devastating bugs

```c
char *p = malloc(10);
// ...
free(p);
```

::right::

<img src="/images/ownership-stack-heap.svg" alt="A pointer p on the stack refers to allocated data on the heap" class="h-70 mx-auto" />

<style>
.two-cols-header {
  grid-template-columns: 60% 40%;
}
</style>

<!--
in C, the programmer decides when to free the data.

it gives us explicit control, but is error-prone.
-->

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
    *x = 5; // can still access freed memory
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

- **The compiler** runs static analyses to ensure no dangling pointers or double frees
  - Unsafe idioms are disallowed in safe Rust
  <!--- Memory leaks are not prevented (not a memory-safety problem)-->
  - Instead of having "segmentation faults" when running, the compiler catches errors at compile time

- Key features of Rust that ensure safety: **ownership** and **lifetimes**
  - Data has a single owner. Immutable aliases are OK, but mutation only via the owner or a single mutable reference
  - How long data is alive is determined by a lifetime

---
layout: two-cols-header
hide: true
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

# Ownership Rules

1. Each value in Rust has an owner
2. There can only be **one owner at a time**
3. When the owner goes **out of scope**, the value is **dropped** (resources freed, can no longer be accessed)

<!--
- Only one **owner** of a value at a time.
- When the owner goes out of scope, its data is automatically freed; no garbage collection
- Cannot access a value beyond its lifetime (checked at compile time)
-->

```rust
fn foo() {
    let mut s = String::from("hello");
    s.push_str(", world!");
    println!("{}", s); // hello, world!
    // s owns the string on the heap.
} // s is dropped; its heap buffer is freed.
```

---
hide: true
---

# Rules of Ownership

1. Each value in Rust has an owner

<v-clicks>

2. There can only be **one owner at a time**

3. When the owner goes **out of scope**, the value is **dropped** (and its owned resources are freed)

</v-clicks>

---
layout: two-cols-header
---

# Ownership Transfer: Variable Assignment

- `let s2 = s1` **moves** the `String` from `s1` to `s2`; its heap buffer stays in place
- After the move, `s2` is the only owner and `s1` can no longer be used
- Only `s2` frees the buffer when dropped: prevents a **double free**

::left::

```rust
fn main() {
    let s1 = String::from("hello");

    let s2 = s1; // Ownership moves from s1 to s2.

    println!("{}, world!", s2); // OK
    // println!("{}, world!", s1); // Error: s1 was moved.
}
```

::right::

<div class="grid h-68 place-items-center">
  <img src="/images/trpl04-01.svg" class="col-start-1 row-start-1 h-50 w-full object-contain" />
  <img v-click="1" src="/images/trpl04-02.svg" class="col-start-1 row-start-1 h-68 w-full object-contain bg-white" />
  <img v-click="2" src="/images/trpl04-04.svg" class="col-start-1 row-start-1 h-68 w-full object-contain bg-white" />
</div>

<!--
Ownership may be **transferred** (moved) to another variable or function parameter
-->

---

# Ownership Transfer: Function Calls

- Passing arguments follows the same ownership rules as assignment.
- Returning values can also transfer ownership.

```rust
fn main() {
    let s1 = String::from("hello");

    // s1 moves to the parameter; the result moves to s2.
    let s2 = id(s1);

    println!("{}", s2); // OK
    // println!("{}", s1); // Error: s1 was moved.
}

fn id(s: String) -> String {
    s // Move s back to the caller.
}
```

---
layout: two-cols-header
---

# Deep Copying Retains Ownership

- `.clone()` creates an independent `String` and heap buffer; the original stays usable

- Types implementing **`Copy`** copy automatically
  - `i32`, `char`, `bool`, `f32`, and tuples of `Copy` types ([complete list](https://doc.rust-lang.org/stable/std/marker/trait.Copy.html#implementors))

::left::

Cloning a `String`
```rust
let s1 = String::from("hello");
let s2 = s1.clone();
```

<img src="/images/trpl04-03.svg" class="h-60 w-full" />

::right::

`i32` implements `Copy`, so clone happens automatically
```rust
let x = 5;
let y = x;
```

<style>
.two-cols-header {
  grid-template-columns: 45% 55%;
}
</style>

---

# References and Borrowing

- A reference is an explicit, **non-owning pointer** to the original value
- Creating a reference with `&` is called **borrowing**; ownership stays with the original owner
- **Shared references** (`&T`) do not permit mutation through the reference (like `const T *` in C)
- **Mutable references** (`&mut T`) permit mutation (like `T *` in C)

```rust
fn main() {
    let s1 = String::from("hello");
    let len = calc_len(&s1); // Borrow s1; do not move it.
    println!("the length of '{}' is {}", s1, len); // s1 is still usable.
}

fn calc_len(s: &String) -> usize {
    // s.push_str("hi"); // Error: cannot mutate through a shared reference.
    s.len()
} // The borrow ends; the String is not dropped here.
```

<!--
but it would be inconvenient to have to clone a String every time we want to use it
-->

---
hide: true
---

# Quiz 1: Who Owns `s`'s Data at HERE?

A. `x` <br/>
B. `y` <br/>
<span :class="{ 'font-bold': $clicks >= 1 }">C. `z`</span> <v-click><span class="ml-[18px]">✅</span></v-click> <br/>
D. `w`

```rust
fn foo(s: String) -> usize {
    let x = s;
    let y = &x;
    let z = x;
    let w = &z;
    // HERE
}
```

---

# References and Borrowing

- To permit mutation via a reference, use `&mut`
  - But only OK for mutable variables (`let mut`)
- Dereference with `*` to access the value behind a reference

<RustPlayground top="185px">

```rust
fn main() {
    let mut s1 = String::from("hello");
    let len = calc_len(&s1);
    println!("the length of '{}' is {}", s1, len);

    append(&mut s1); // Borrow s1 mutably; do not move it.
    println!("after append: '{}'", s1);
    // s1.push_str("!"); // implicit &mut: String::push_str(&mut s1, "!");
}

fn append(s: &mut String) {
    s.push_str(" world"); // OK: can mutate through a mutable reference.
}

fn calc_len(s: &String) -> usize {
    // s.push_str(" world"); // Error: cannot mutate through a shared reference.
    s.len()
} // The borrow ends; the String is not dropped here.
```

</RustPlayground>

<!--
* to use a mutable reference, use ampersand mut
* we can also use `*` to dereference references
* implicit `&mut`, see std.rs
-->

---

# Rules of References

1. At any given time, you can have _either but not both of_
    - One mutable reference
    - Any number of immutable references

2. References must always be valid (pointed-to value not dropped)

---

# Borrowing and Mutation

- When we have a shared reference
  - The owner and shared references can all read the value
  - Mutation is disallowed

<RustPlayground top="185px">

```rust
fn main() {
    let mut s1 = String::from("hello");
    {
        let s2 = &s1;
        println!("String is {} and {}", s1, s2); // OK: shared reads
        // s1.push_str(" world!"); // Error: s2 is used below (implicit &mut)
        println!("Borrowed string is {}", s2);
    }
    s1.push_str(" world!"); // Mutation OK: shared borrow has ended
    println!("String is {}", s1);
}
```

</RustPlayground>

<!--
let's see some examples

the reason why this should be invalid is that if we modify s1, the next use of s2 would see changed text. that would violate our assumption that oh since s2 is an immutable reference, it should not change. so rust disallows this.
-->

---

# Quiz 2: What Does This Evaluate To?

A. `"Hello!"` <br/>
<span :class="{ 'font-bold': $clicks >= 1 }">B. Error</span> <v-click><span class="ml-[120px]">✅ — `s2` is a shared reference, so it cannot mutate the string</span></v-click> <br/>
C. `"Hello!World!"`

<RustPlayground top="180px">

```rust
fn main() {
    let mut s1 = String::from("Hello!");
    {
        let s2 = &s1;
        s2.push_str("World!");
        println!("{}", s2);
    }
}
```

</RustPlayground>

---

# Quiz 3: What Is Printed?

A. 0 <br/>
<span :class="{ 'font-bold': $clicks >= 1 }">B. 8</span> <v-click><span class="ml-[50px]">✅ — `foo` appends `"Bob"`, making `"AliceBob"` (length 8).</span></v-click> <br/>
C. Error <br/>
D. 5

<RustPlayground top="200px">

```rust
fn foo(s: &mut String) -> usize {
    s.push_str("Bob");
    s.len()  // last expression is the return value
}

fn main() {
    let mut s1 = String::from("Alice");
    println!("{}", foo(&mut s1));
}
```

</RustPlayground>

---

# Borrowing and Mutation

* When we have a mutable reference
  * No other references (mutable or shared) are allowed

<RustPlayground top="160px">

```rust
fn main() {
    let mut s1 = String::from("hello");
    { 
        let s2 = &mut s1;
        let s3 = &mut s1; // Error: second borrow
        s1.push_str(" there"); // Error: second (implicit) borrow
        s2.push_str(" world");
    }
    s1.push_str(" there"); // OK
    println!("String is {}", s1);
}
```

</RustPlayground>

<!--
another rule is that we can only have one mutable reference at a time.
-->

---

# Dangling References

- References must always point to **valid memory**
  - Not to memory that has been dropped
- Rust uses **lifetimes** to prevent references from outliving their referents

```rust
fn dangle() -> &String {
    let s1 = String::from("hello");
    &s1 // Invalid: returning a reference to a local String.
} // s1 is dropped and its heap buffer is freed.
```

---

# Lifetimes: Preventing Dangling References

- The value `x` goes out of scope before the reference `r` is used
- A reference must not **outlive the value it refers to**

<RustPlayground top="170px">

```rust
fn main() {
    let r; // Deferred init             ←──┐ r defined
    {              //                      │
        let x = 5; // ←──┐ x defined       │
        r = &x;    //    ├─ x's lifetime   │
    }              // ←──┘ x dropped       ├─ r's lifetime
                   //                      │
    // Error: x no longer exists.          │
    println!("r: {}", r); //               │
}                         //            ←──┘ r dropped
```

</RustPlayground>

---

# Lifetimes and Functions (hide?)

- A function's returned reference must remain valid in the caller
- What if it refers to an argument that goes out of scope?

<RustPlayground top="170px">

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

fn main() {
    let x = String::from("hi");
    let z;
    {
        let y = String::from("there");
        z = longest(&x, &y); // The longer string is y.
    } // y is dropped; a reference to it cannot be used afterward.
    println!("z = {}", z); // Error: y does not live long enough.
}
```

</RustPlayground>

---

# Quiz 4: What Is Printed? (hide?)

A. `dog` <br/>
B. `hi` <br/>
C. Error — `y` is immutable <br/>
<span :class="{ 'font-bold': $clicks >= 1 }">D. Error — `y` is dropped while still borrowed</span> <v-click><span class="ml-[18px]">✅</span></v-click>

<RustPlayground top="200px">

```rust
fn main() {
    let mut s = &String::from("dog");
    {
        let y = String::from("hi");
        s = &y;
    }
    println!("s: {}", s);
}
```

</RustPlayground>

---

# Recap: Rules of References

1. At any given time, you can have either but not both of
   - One mutable reference
   - Any number of immutable references

2. References must always be valid
   - A reference must never outlive its referent

---
layout: section
---

# Functional language features

Chapter 13

---

# Vectors and slices

---

# Closures

- **Syntax**: <span class="font-mono">|<i>x1</i><span style="color: #808080">&#91;</span>: <i style="color: #ef3024">t1</i><span style="color: #808080">&#93;<sup>?</sup></span>, …, <i>xn</i><span style="color: #808080">&#91;</span>: <i style="color: #ef3024">tn</i><span style="color: #808080">&#93;<sup>?</sup></span>| <span style="color: #808080">&#91;</span>-> <i style="color: #ef3024">u</i><span style="color: #808080">&#93;<sup>?</sup></span> <i style="color: #ef3024">e</i></span>
  - type annotations are inferred if absent
  - `let add = |x: i32, y: i32| -> i32 { x + y }`
  - `let add = |x, y| x + y`

- **Evaluation**: a closure is a value

- **Type checking**:
  - Has type `t1 -> ... -> tn -> u`
  - Not curried

---
layout: two-cols-header
---

# Using Closures/Functions Locally

::left::

**Rust**

```rust {all|2,3}
fn moveit(l: bool, x: i32) -> i32 {
    let left  = |x| x - 1;
    let right = |x| x + 1;
    if l {
        left(x)
    } else {
        right(x)
    }
}
```

::right::

**Haskell**

```haskell {all|3,4}
moveit :: Bool -> Int -> Int
moveit l x =
  let left  = \x -> x - 1
      right = \x -> x + 1
  in if l
     then left x
     else right x
```

---

# Iteration using the `Iterator` Trait

- Recall an earlier example:

```rust
let a = vec![10, 20, 30, 40, 50];
for e in a.iter() {
    println!("the value is: {}", e);
}
```

- The `iter()` method returns an **iterator**, a value implementing the `Iterator` trait

```rust
trait Iterator {
    type Item; // An associated type
    fn next(&mut self) -> Option<Self::Item>;
    // … default method implementations
}
```

---

# `Iterator` Adaptors

- We can make one iterator from another
  - An iterator is **consumed as it is used**; it is **lazy**
- This is a pattern for higher-order programming
  - `i.map(f)` produces an iterator returning `f(e)` for each element `e` of `i`
  - `i.filter(f)` produces an iterator containing elements `e` for which `f(e) == true`
  - `i.collect()` collects an iterator into a collection, such as a `Vec`
  - `i.fold(a, f)` is like Haskell's `foldl f a xs`
    - `xs` is the list corresponding to `i`; `a` is the initial accumulator
  - `zip`, `sum`, …

---

# Using Iterators
