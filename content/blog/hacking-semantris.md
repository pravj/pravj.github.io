+++
date = "2018-12-02T00:00:00+05:30"
title = "Hacking Semantris: The Google AI Experiment"
description = "Lets find out how India shops and how big is Myntra"
tags = ["Computer Vision", "OpenCV", "NLP", "Hack"]
+++


> [Semantris](https://experiments.withgoogle.com/semantris) is a set of word association games that use semantic search to predict a relevant word in the game based on the player's input.

#### ARCADE

Arcade mode requires a player to quickly come up with associated words for certain words. You are supposed to think and type as fast as you can before an increasing list of words fills your screen.

#### BLOCKS

Blocks is a turn-based game mode. You can take your time to come up with different types of clues and see which ones the game understands best.

<figure> <img src="/images/semantris-combined.jpg">
        <figcaption>Semantris ARCADE and BLOCKS modes</figcaption>
</figure>

> In the name of **automating everything**, I wrote a program [(Semantris-Solver)](https://github.com/pravj/semantris-solver) that can play both the modes on its own. In this post, I will explain how the program works.

In simple terms, it follows these steps:

1. **Capture the game state using computer vision techniques (OpenCV)**
2. **Identify the word to enter for higher reward (OCR)**
3. **Find the word associated for it using word embedding (Word2Vec)**

Sounds fun? Keep reading to know more about it in details.

### <b>ARCADE (think fast; type fast)</b>

#### GAME FLOW
For a human player, the arcade mode looks something like this:

1. Find one or more highlighted words in the game (<i>face</i>)
2. Get these words in the highlighted area by entering their associated words (<i>mask</i> worked for <i>face</i>; <i>bike</i> did not)
3. Keep doing this before you run out of space on your screen for new words

<figure> <img src="/images/semantris-arcade.gif">
        <figcaption>Semantris ARCADE game</figcaption>
</figure>

#### CAPTURING HIGHLIGHTED WORDS
There are 3 possible color themes in the arcade mode.

<figure> <img src="/images/semantris-arcade-theme-colors.jpg">
        <figcaption>Semantris ARCADE color themes</figcaption>
</figure>

<b>Color Space Conversion</b>

The program starts with capturing the device screenshot and then converts it (the image) into grayscale, making it <b>theme-color agnostic</b>.

<figure> <img src="/images/semantris-arcade-gray-scale.png">
        <figcaption>Semantris ARCADE gray scale</figcaption>
</figure>

<b>Template Matching</b>

> Each highlighted word has a pointer shape left to it, for example (‎▶ <b>Ship</b>).

[OpenCV template matching](https://docs.opencv.org/3.3.0/d4/dc6/tutorial_py_template_matching.html) can find a template image in a given image based on multiple similarity methods.

<figure> <img src="/images/semantris-arcade-selected-highlighted-word.png">
        <figcaption>Semantris ARCADE highlighted word selection</figcaption>
</figure>

An approximate rectangle is cut right next to the template image section to crop the desired word.
<figure> <img src="/images/semantris-arcade-highlighted-word.png">
        <figcaption>Semantris ARCADE highlighted word</figcaption>
</figure>

The cropped image is converted into text using [tesseract OCR](https://github.com/tesseract-ocr/tesseract).
In case of more than one such words, they are entered one after another to keep the game moving.

#### ASSOCIATED WORD
[Word2Vec pre-trained on Google News corpus](https://github.com/mmihaltz/word2vec-GoogleNews-vectors) is used as a word embedding model to find the [most similar](https://radimrehurek.com/gensim/models/word2vec.html#gensim.models.word2vec.Word2Vec.most_similar) words (associated) for a given word.

In this case, it would return <b>vessel</b> to enter as an associated word for <b>ship</b> (after removing morphologically similar words).

### BLOCKS (take your time; puzzle it out)

> There are 4 colored boxes that might or might not contain words, some boxes have mixed colors. Entering associated word for a box (word) will remove the same colored boxes connected to it. Similar to the good ol' <b>tetris</b>.

#### GAME FLOW
For a human player, the blocks mode looks something like this:

1. Enter associated word for a box connected with maximum same colored boxes
2. Keep doing this before you run out of space on your screen for new words

<figure> <img src="/images/semantris-blocks.gif">
        <figcaption>Semantris BLOCKS game</figcaption>
</figure>

#### CAPTURING WORD WITH HIGHER REWARD
Similar to the arcade mode, there are 3 possible color themes in the blocks mode too.

<figure> <img src="/images/semantris-blocks-theme-colors.jpg">
        <figcaption>Semantris BLOCKS color themes</figcaption>
</figure>

<b>Color palette detection</b>

For a given theme, we need to able to distinguish the colors present in the game to find the (word) box that can give us maximum score (connected to maximum other boxes).

<figure> <img src="/images/semantris-blocks-game-theme.png">
        <figcaption>Semantris BLOCKS game theme</figcaption>
</figure>

This is what we get after using K-mean clustering to find all the major color segments in the captured screenshot. It includes excluding background colors such as white (text), black, and gray (text input section) etc.

<figure> <img src="/images/semantris-blocks-theme-color-palette.png">
        <figcaption>Semantris BLOCKS theme color palette</figcaption>
</figure>

<b>Contour detection</b>

> Contour is a curve joining all the continuous points (along a boundary), having same color or intensity.

A word-box can be considered a contour of that color; if it's connected to more boxes with same color, the contour's area will be the sum of the connected boxes.

At any turn, <b>a random color word-box out of the 4 colors in palette</b> is selected for the duration of the game.


> It can be improved further by detecting the color with maximum contour area.

All the contours for the selected color are detected using OpenCV's [findContours](https://docs.opencv.org/3.3.1/d3/dc0/group__imgproc__shape.html#ga17ed9f5d79ae97bd4c7cf18403e1689a) method.

<figure> <img src="/images/semantris-blocks-color-contours.png">
        <figcaption>Semantris BLOCKS contours for selected color</figcaption>
</figure>

<b>Maximum area contour detection</b>

After converting to the gray-scale, the contour with maximum area is selected as it's connected with more word-boxes.

<figure> <img src="/images/semantris-blocks-max-area-contour.png">
        <figcaption>Semantris BLOCKS maximum area contour</figcaption>
</figure>

Similar to the arcade mode, the cropped image is converted into text using [tesseract OCR](https://github.com/tesseract-ocr/tesseract).

> If you like this article, follow me on [twitter](https://twitter.com/hackpravj) to hear when I write another one.