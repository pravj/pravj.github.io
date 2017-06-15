+++
date = "2017-06-15T00:00:00+05:30"
title = "Contributing to the Go programming language"
description = "A gopher's guide for contributing to the Go programming language"
tags = ["Golang", "Open Source"]
socialsharing = false
+++

> This article describes my experience contributing the [first commit](https://github.com/golang/go/commit/538b3a5f37a5316a4ba081fd5a8eb5fb09992ba7) to the Go programming language. It might be one small step for you, but it's one giant leap for the gopher inside me.

Along with my experience, I will outline the article as a (beginner's) gopher's guide for contributing to an open source project (the [Go project](https://github.com/golang) in this case).

I have started learning Go in the late 2014 and I was lucky enough to receive a healthy appreciation from the community for [my very first project](https://github.com/pravj/geopattern) in the language. Since then, it has been one of my two goto languages (Python being the other one).

Fixing issues and submitting pull requests is [one of my favorite pastime](https://github.com/pravj). And I have seen myself forking or creating more repositories in Go as compared to Python lately. I would say my love for Go has increased.

### Living in the community

When you use a software extensively and love it, you start loving the community too. You find your own heroes, learn from them and aspire to be like them. The same happened after getting convinced that Go is my next mate.

In my early days of learning Python, I remember reading more and more about "Guido van Rossum" being the "Benevolent Dictator For Life" and "Kenneth Reitz" transforming the development via "requests" etc.

> Who to copy is easy. You copy your heroes – the people you love, the people you’re inspired by, the people you want to be.

As you get more and more (truly) involved, you attempt to move up the ladder in the open source hierarchy. Your self expectations want you to become a producer (maintainer / contributor) from a consumer (user).

### Finding things to contribute

> There is **always** something to do for your experience level, you need to find it.

As a child, I used to think that there is nothing new to create and all the possible things had been innovated already. To my surprise, I realized that my assumption was wrong when I started learning about different things.

Similarly, if you want to contribute to a project, you need to keep using (exploring) it to its fullest. You will inevitably run into issues that require contributing back to the project.

### No contribution is small

> When they say that contributions are welcome, they mean it. Even if it's a small change in the project documentation.

In fact, the contribution I'm celebrating isn't my first to the Go project. My first contribution was to the [Go blog](https://github.com/golang/blog/commit/83eaf8725de030de65c4ae73d82b1e8e002901a2). It was just a simple rephrasing, updating a dead link. It turned out to be a nice excuse to get familiar with [Gerrit](https://go-review.googlesource.com), the review system used by Go team.

### Something to be enthusiastic about

After getting that small documentation patch merged, I was eager to see my name in the core language repository contributors.

Also, I had another private motivation.

Let me explain. That's what I saw when I opened the [Go AUTHORS](https://golang.org/AUTHORS) file.

```
A Medium Corporation
Aamir Khan <syst3m.w0rm@gmail.com>
Aaron France <aaron.l.france@gmail.com>
...
```

The second name **Aamir Khan** seemed familiar to me. He was my college senior and has been an inspiration to me. I remember that one of my very first emails to a stranger was to him when I asked him for the source code of his competition winning website.

Now that his name was there, I wanted my name in there too. I was determined to follow the path, just like him.

I'm not comparing myself here, just following up on the beautiful quote by "Pablo Picasso".

> Good artists copy; Great artists steal.

### Setting up the tools

Once you've found something to contribute, you need to [configure Git to use Gerrit](https://golang.org/doc/contribute.html#auth).

The [contribution guide](https://golang.org/doc/contribute.html) is the best (and official) place to learn about completing the [Contributor License Agreement](https://golang.org/doc/contribute.html#cla), [installing git-codereview](https://golang.org/doc/contribute.html#git-codereview_install), and [setting up git aliases](https://golang.org/doc/contribute.html#git-config). You should finish it to get familiar with the **git-codereview** workflow.

### tip and release versions of Go

The [tip version](https://tip.golang.org) of the language is same as the current master on GitHub.

> $ go version
>
> go version devel +03a4a5c Wed Jun 14 17:28:02 2017 +0000 darwin/amd64

The release version is what you've installed.

> $ go version
>
> go version go1.8.3 darwin/amd64

You can switch to whichever (**$ which go**) you want during the build process by changing the location of Go in **$PATH**.

### The real contribution

The [reflect](https://golang.org/pkg/reflect/) package has a method [StructOf](https://golang.org/pkg/reflect/#StructOf) which accepts a slice of [StructField](https://golang.org/pkg/reflect/#StructField) (type struct) and generates a new **Struct** containing those fields.

It was [reported](https://github.com/golang/go/issues/20600) that the function is producing **Structs** with invalid field names [according to the language grammar](https://golang.org/ref/spec#Struct_types).

```
type S struct {
  Field1 Type1
  Field2 Type2
  ...    ...
}
```

---

According to the language grammar, here is the **Extended Backus-Naur Form** of a [Struct Type](https://golang.org/ref/spec#Struct_types).

```
StructType     = "struct" "{" { FieldDecl ";" } "}" .
FieldDecl      = (IdentifierList Type | AnonymousField) [ Tag ] .
IdentifierList = identifier { "," identifier } .
identifier     = letter { letter | unicode_digit } .
letter         = unicode_letter | "_" .
```

---

It turns out that the **Field Name** should be an **Identifier**. So I implemented a function [isValidFieldName](https://github.com/golang/go/commit/538b3a5f37a5316a4ba081fd5a8eb5fb09992ba7) with the signature **(fieldName string) bool** to check if a given string is a valid field name or not.

### What's next?

It was a fun exercise overall. I have one more [pull request pending](https://github.com/golang/lint/pull/302) in the "golint" repository. I hope it will be reviewed soon.

> As long as **TryBots Are Happy**, I look forward to more such contributions.

### Hire me!

For now, I'm looking for a new role as a Software Engineer. I am good with Web Services and APIs, Data Analysis and Visualization. You can walk around to know more about my previous work. Hit me up if you have a lead, **hackpravj [@] gmail [.] com**.
