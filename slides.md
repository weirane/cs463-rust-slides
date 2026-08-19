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
layout: section
---

# Overview

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

