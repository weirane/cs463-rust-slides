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

# Rust in the Real World

- [Modern command-line tools rewritten in Rust](https://inrust.dev/)
  - `ls` → `eza`, `cat` → `bat`, `find` → `fd`, `grep` → `ripgrep`

- [OpenAI Codex](https://github.com/openai/codex)
  <img src="/images/codex-language-breakdown.png" alt="Codex repository language breakdown: Rust 97.3%, Python 2.2%, Starlark 0.2%, TypeScript 0.1%, PowerShell 0.1%, Shell 0.1%" width="175" class="mt-3" />

- [Rust in **Android**: move fast and fix things](https://blog.google/security/rust-in-android-move-fast-fix-things/) (Nov. 2025)

- [Writing **Linux kernel** code in Rust is no longer experimental](https://lwn.net/Articles/1050174/) (Dec. 2025)

- [Rust Is Tier-1 Language at **Microsoft**](https://rustfoundation.org/media/guest-post-rust-is-tier-1-language-at-microsoft/) (Sep. 2026)
  - Alongside C++, C#, and TypeScript

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

# Using cargo (demo)

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

---
