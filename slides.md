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

- Lifetimes and Ownership
  - Key feature for ensuring safety
- Traits as core of object(-like) system
- Variable default is immutability
- Data types and pattern matching
- Type inference
  - No need to write types for local variables
- Generics (aka parametric polymorphism)
- First-class functions
- Efficient C bindings

> Takes ideas from functional and OO languages, and recent research

---

# Why Rust?

- Memory safety without garbage collection
- Predictable performance
- Fearless concurrency

---
references:
  - "The Rust Programming Language — https://doc.rust-lang.org/book/"
---

# A Small Example

```rust {all|1|2-4|all}
fn main() {
    let message = String::from("Hello, Rust!");
    println!("{message}");
}
```

---
layout: center
class: text-center
---

# Questions?
