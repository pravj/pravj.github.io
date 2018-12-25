+++
date = "2018-12-02T00:00:00+05:30"
title = "Solving Google Semantris using OpenCV and Word2Vec"
description = "Solving Google Semantris using OpenCV and Word2Vec"
tags = ["Computer Vision", "OpenCV", "NLP", "Hack"]
+++


> [Semantris](https://experiments.withgoogle.com/semantris) is a set of word association games by Google that use semantic search to predict a relevant word in the game based on the player’s input.

There are 2 modes available in the game.


#### ARCADE

Arcade mode requires the player to come up with associated words for certain words. You are supposed to think and enter as fast as you can before an increasing list of words fills your screen.

<figure> <img src="/images/semantris-arcade.gif">
    <figcaption>Semantris ARCADE mode</figcaption>
</figure>

#### BLOCKS

Blocks is a turn-based game mode. You can take your time to come up with different types of clues and see which ones the game understands best.

<figure> <img src="/images/semantris-blocks.gif">
    <figcaption>Semantris BLOCKS mode</figcaption>
</figure>

> After playing for a while, I realized both the game modes are using [pattern recognition as the main game-play mechanism](http://www.peachpit.com/articles/article.aspx?p=98123&seqNum=2).
> **That’s when I started thinking if the game-play can be automated.**

## TURNS OUT, IT CAN BE ( automated )

[Semantris-Solver](https://github.com/pravj/semantris-solver) uses the following procedure to play the game:


1. **Capture the current game state using computer vision techniques**
2. **Identify the word to enter for higher-reward/longer-gameplay**
3. **Find the associated word using word-embeddings**

> In the following sections, we are going to dive into the working of the Semantris-Solver for both the game modes.

---


## ARCADE
A human player will use the following moves to play the arcade mode:

1. Find one or more highlighted words in the game
2. Get these words in the highlighted area by entering the associated word for them
3. Keep doing this before you run out of space on your screen for new words

> Also, there are three types of theme colors in arcade mode.

<figure> <img src="/images/semantris-arcade-theme-colors.jpg">
    <figcaption>Semantris ARCADE theme colors</figcaption>
</figure>

You will realize that the theme color isn’t playing any role here, the game playing mechanism will remain the same if we change the theme color, what changes is the definition of the highlighted word.

> A word is **highlighted** if it has a pointer shape left to it, "‎▶ **Ship**" in this case.

#### COLOR SPACE CONVERSION
ARCADE mode of Semantris-Solver starts with capturing the screenshot of the laptop screen and converts it into a gray-scale image, agnostic of the actual color.

<script src="https://gist.github.com/pravj/b4d85a59cd0e7db7892b5015b965c4f7.js"></script>

<figure> <img src="/images/semantris-arcade-gray-scale.png">
    <figcaption>Semantris ARCADE mode (gray-scale)</figcaption>
</figure>

#### TEMPLATE MATCHING
Our next step will be to find the highlighted word in the captured image. OpenCV provides a method called [Template Matching](https://docs.opencv.org/3.3.0/d4/dc6/tutorial_py_template_matching.html) for searching and finding the location of a template image in a larger image.

We will use a cropped version of the pointer shape (▶) as a template image, to find its location in the captured screen.

<script src="https://gist.github.com/pravj/7a9a5da6f20f18e213313a83e0da1bf8.js"></script>

<figure> <img src="/images/semantris-arcade-selected-highlighted-word.png">
    <figcaption>Semantris ARCADE highlighted word selection</figcaption>
</figure>

#### OPTICAL CHARACTER RECOGNITION
Based on the pointer’s location, a section is cropped right next to it, with the highlighted word.

<figure> <img src="/images/semantris-arcade-highlighted-word.png">
    <figcaption>Semantris ARCADE highlighted word</figcaption>
</figure>

The cropped image is converted into text using [Tesseract OCR](Tesseract OCR); in this case, it will give us the word **Ship**.

<script src="https://gist.github.com/pravj/619a228dc9036519dafd5de5d8139b18.js"></script>

> In case of more than one highlighted words, they are entered one after another to keep the game moving.

#### ASSOCIATED WORD SELECTION
[Word2Vec pre-trained on Google News corpus](Word2Vec pre-trained on Google News corpus) is used as a word embedding model to find the [most similar](https://radimrehurek.com/gensim/models/word2vec.html#gensim.models.word2vec.Word2Vec.most_similar) words (associated) for a given word.

<script src="https://gist.github.com/pravj/5075bd9fdd7b093ceee1b4da80b249f3.js"></script>

In this case, it will return **vessel** to enter as an associated word for **ship** (*after removing morphologically similar words  *). The program will enter this associated word and capture the updated game screen to continue.

---

## BLOCKS
In this mode, there are word-blocks with four possible colors for a given theme, the word-blocks might or might not contain a word in them.

Entering the associated word for a word-block will remove the same colored blocks connected to it, similar to the good old **Tetris**.

A human player will use the following moves to play the arcade mode:

1. Enter the associated word for a word-block, typically connected with maximum same colored word-blocks
2. Keep doing this before you run out of space on your screen for new words

<figure> <img src="/images/semantris-blocks-game-theme.png">
    <figcaption>Semantris BLOCKS mode captured screen</figcaption>
</figure>

You will realize that the color of a word-block is playing a significant role this time. You will have to enter the associated word for a word-block connected with more same colored blocks to score higher points.

> On top of this, there are three types of theme colors in blocks mode.

<figure> <img src="/images/semantris-blocks-theme-colors.jpeg">
    <figcaption>Semantris BLOCKS theme colors</figcaption>
</figure>

#### COLOR PALETTE GENERATION
This time we can’t convert the captured image into its gray-scale version. We need to know the color attributes to be able to distinguish between different word-blocks.

Running **K-mean clustering** on the pixels of the captured screen will give us all the prominent colors in the image after excluding background colors such as white (text-color), black (background-color), and gray (text-input).

<script src="https://gist.github.com/pravj/5537fe59a13f6bacbe3855eced767ed9.js"></script>

<figure> <img src="/images/semantris-blocks-theme-color-palette.png">
    <figcaption>Semantris BLOCKS theme color palette</figcaption>
</figure>

#### CONTOUR DETECTION
Now that we have all the four colors in the current theme, we need to know which word-block to choose to get maximum points.

In other words, if we calculate the area of every connected-word-block-group (*word-blocks of the same color connected to each other*) and select the one with the maximum area, we will get the desired connected-word-block-group.

> [Contour](https://docs.opencv.org/3.4/d4/d73/tutorial_py_contours_begin.html) is a curve joining all the continuous points along a boundary, having same color or intensity.

A word-block group can be considered a contour of that color; if it’s connected to more blocks with the same color, the contour’s area will be the sum of the connected word-blocks.

<figure> <img src="/images/semantris-blocks-contour-image.png">
    <figcaption>Semantris BLOCKS mode with maximum area contour highlighted</figcaption>
</figure>

Contours are calculated (using OpenCV’s [findCountours](https://docs.opencv.org/3.3.1/d3/dc0/group__imgproc__shape.html#ga17ed9f5d79ae97bd4c7cf18403e1689a) function) for all the word-block colors separately and the one with the maximum area is selected.

<script src="https://gist.github.com/pravj/2be7a1c308b969735c1387839503a600.js"></script>

We can select the maximum area contour by doing a bitwise-and operation between the captured screen and the contour mask.

<figure> <img src="/images/semantris-blocks-max-area-contour.png">
    <figcaption>Semantris BLOCKS Maximum area contour</figcaption>
</figure>

#### WORD DETECTION (Using Tesseract and Word2Vec)

The contour image is converted into text using [Tesseract OCR](https://github.com/tesseract-ocr/tesseract); in this case, it will give us **Garden**.

Similar to the arcade mode, we will use Word2Vec to find the most similar word to it, which will be **Flower beds** this time.

---

## IMPROVEMENTS
In certain scenarios, the current OCR process doesn’t recognize the word properly.

For example, it would return **Eloctrlclty** for this contour instead of **Electricity**.

<figure> <img src="/images/semantris-blocks-failing-contour.png">
    <figcaption>Semantris BLOCKS contour with wrong OCR results</figcaption>
</figure>

Given that it’s an invalid word suggestion, the Word2Vec model will not return any similar word for it. In that case, the suggested word itself is entered as an associated word, just to keep the game moving.

> A spelling correction model can help here, correcting **Eloctrlclty** to **Electricity**.
>
> I have created an [issue on the GitHub](https://github.com/pravj/semantris-solver/issues/7) repository for the same, feel free to contribute if you like. 😄

---

## SOURCE CODE

#### [Semantris-Solver](https://github.com/pravj/semantris-solver) (GitHub)
It’s implemented as a CLI tool that allows you to switch between the game modes. You can check the **IPython notebooks** implementing both the modes.

1. [ARCADE mode](https://github.com/pravj/semantris-solver/blob/master/notebooks/Semantris%20Arcade%20Mode.ipynb)
2. [BLOCKS mode](https://github.com/pravj/semantris-solver/blob/master/notebooks/Semantris%20Block%20Mode.ipynb)

#### Dependencies
It wasn’t possible to implement Semantris-Solver without the following software tools (any many more).

1. OpenCV
2. Word2Vec (gensim)
3. pyautogui (taking the screenshot and entering associated words)
4. Tesseract (OCR)

---

Hope you liked my weekend hack story. Feel free to provide your feedback.

I can be reached on [Twitter](https://twitter.com/hackpravj) or through my personal website [hackpravj.com](https://hackpravj.com).
