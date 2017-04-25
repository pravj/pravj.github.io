+++
date = "2015-01-15T00:00:00+05:30"
title = "The git-game Write-up"
description = "Solving a game layered on top of Git"
tags = ["Git", "Game", "Writeup", "GitHub"]
+++

> `Spoiler Alert`
>
> You should go and check this out, [git-game](https://github.com/hgarc014/git-game).
>
> It's a nice little *complete-a-task-and-upgrade-level* type of game layered on top of Git.

*It is a terminal game designed to test your knowledge of git commands. Each level in the game is a task to perform on this repo. Once you perform that task, you will be given your next task. There are a total of ten levels, each one harder than last!*

I saw the reference to this game floating around in my GitHub feed yesterday. The concept is awesome as there are already [many](http://pcottle.github.io/learnGitBranching/) online tutorial courses on the Internet that uses interactive *learning-with-doing* methods for Git.

According to the repository, I started the adventure with cloning the repository using ```git clone git@github.com:hgarc014/git-game.git``` command.

The *default branch* was *master* and there were only two files in repository's *working directory*, README.md and LICENSE.

I started with the README.md file and ```cat README.md``` revealed all its content.

> You should always check the README.md file for your next clue!

> Your first task is to checkout the commit whose commit message is the answer to this question:

> When a programmer is born, what is the first thing he/she learns to say?

Well! a programmer is also a boy/girl, so first thing they do is *cry* but in the current context that thing will be *Hello, World!* :grinning:

Now I had to find the commit whose commit message was *Hello World*, so the command ```git log --graph --online``` resulted this commit history.


> \* 25bfa08 added information for people that don't know git

> \*   27e9786 Merge pull request #6 from riqpe/master

> |\ 

> | * 3893960 Corrected description of difficulty progression

> |/
  
> \* bc9641f updated README

> \* 9b9380b Hello World!

> \* 8cafb7c Initial commit

Can you see the *Hello World! commit* now? Yeah! we can represent it by HEAD~3.
As that commit is *directly at level 3* or we can say *great-grandparent* of the HEAD commit.

So all I needed to do was the command ```git checkout HEAD~3```, doing so we're now done with the first task.

After completing the first task when the HEAD is at that particular commit, the README.md file was ready with its new task.

> git-game

> ========

> Hello World!

> It looks like you have some knowledge about traversing commits!

> Well, let's get this party started!

> We want to get to a branch whose name is the answer to this riddle:

> I am a creature that is smaller than man, but many times more in number.

> In code, my appearance can be subtle and no matter where I am found, I am unwanted.

> What am I?

Easy Peasy? Yeah, the answer is *bug* obviously, so lets fly to same *branch* using the ```git checkout bug``` command.

In this *branch*'s *working directory* there were two extra files, *cool.cpp* and *remember* and the README.md was saying that :

> git-game

> ========

> Congratulations, it looks like you found the "bug."

> When you work with other programmers on the same project, bugs are bound to appear.

> One way to create bugs is by changing code that you did not write without understanding what the code is doing.

> Sometimes we like to blame others for introducing bugs in our code.

> Think you can find out who introduced a bug into our file cool.cpp?

> We think he had something to do with the development of git.

> And from what we hear he also made a branch under his name.

> Checkout to that branch after you find out who the culprit is.

It says that there is a bug in the file *cool.cpp*, lets see.

```
#include <iostream>

using namespace std;

int main()
{
   string mesg = "Hello! Who are you?";
   string input;
   cout << mesg << endl;
   cin >> input;
   cout << "Loops are fun!" << endl;
   while(1);
   string reply = "Well, " + input + ", we hope you are having fun with our git-game!";
   cout << reply << endl;
}
```

Yeah! there is one; the *while loop* will refuse the program from terminating.

So, who did this? Well! that's what we have to answer now.

> git blame - Helps you finding who committed what.
>
> Show what revision and author last modified each line of a file

```git blame cool.cpp``` is here for our rescue. It says that :

```
ce59bbfd (Henry Garcia      2014-12-08 18:22:35 -0800 10)    cin >> input;
3922a6d8 (LinusTorvalds2014 2014-12-09 12:37:10 -0800 11)    cout << "Loops are fun!" << endl;
3922a6d8 (LinusTorvalds2014 2014-12-09 12:37:10 -0800 12)    while(1);
ce59bbfd (Henry Garcia      2014-12-08 18:22:35 -0800 13)    string reply = "Well, " + input + ", ...
```

Damn! someone with a similar name to the great *Linus Torvalds* is the culprit, he wrote that buggy line in the file. OK, lets move to his *branch* as the README says, using ```git checkout LinusTorvalds2014``` command.

This time the README.md file was not explicitly directing anywhere.

```
git-game
========

Looks like you found the branch of the evil Mastermind.
Things may start to get a little more challenging...

The next clue you are looking for --
   is in a file you choose to ignore!
```

When I was doing this I thought may be it's pointing to that useless file named *remember* which was back there in the branch *bug*.

So I *checked-out* again to the branch *bug* and tried to find any clue in the file *remember*. Its content looked like RSA Public keys to me.

```
cweJIY8GOo18Usi5ykA4nmhBR0h 6mMpyy4nFY71IhgjGGr0rkY3uE tVTo j5XlwgLZZ PpRK Pwbnd7Z4bpQWc6sU700xfLTI63FbD DsKCQbUKG KS02qfurxMJ3mHHD8f6VhFUmY2rPD NjznQ8mnQvlNwAR1QsLDK Zjl1kGbWQBeGoOBwVMfa790ATCNg fR OLPA0hi7OW N4jUN26mBIwQVhVtteDSDSr OVfhvUwb7ydODX7R2no xxTmrD5IFUXIB8dDhR lpSFaRcbF2up wrWA J2acmA28c2 NhE Bqj7ntV67GTHpVBSwO
```

I gave up after scrolling through the lengthy *remember* file and *checked-out* again to the branch *LinusTorvalds2014*.

I have a strange habit to use ```ls -a``` instead of ```ls``` to list content of a directory so I did it and Boy! there it was, hiding all this time.

Guess what? there was a file named *.gitignore* and it said :

```
# welcome to the ignore file!!

# This file is hidden by default,
# but did you know you have some branches that aren't shown to you,
# when you check the list of branches?
#
# For your next clue...
# Which abstract data type tends to implement sets and maps??
# The answer is the same answer to this riddle:
#
#   I am both mother and father.
#   I am seldom still
#   yet I never wander.
#   I never birth nor nurse.
#
#   What am I?
#
# Afterwards... well, you
# know, checkout to the answer.

*.rem
a.out
```

This time the answer of riddle is *Tree*, simple. Don't you know? You can *google* it any time, I did the same. :wink:

So the next thing to do was, ```git checkout tree``` and the README.md file there said :

```
git-game
========

Welcome to the "tree" branch.
Looks like good ol' Linus modified the "nextclue_input.cpp" file.
Normally, when ran with the shell script "outputclue.sh", the "nextclue_input.cpp" file would give us the next hint.

Maybe, you should try running the shell script with the "nextclue_input.cpp" file and see what happens...

You can run the script by running the command "./outputclue.sh FILE" .
If you are on Windows, it's okey to use `git-bash` that is installed with [msysgit](https://msysgit.github.io/).
```

On executing the shell script with the *nextclue_input.cpp*, printed something on the STDOUT.

```
Linus has been here...
I love messing with these amateur programmers!!
If you want some real fun, then you should try resolving a conflict between this branch (tree) and code4life.
I introduced a little bug that you should fix in the conflict. >:)
After you merge these 2 files you should run the shell script again!!

Good Luck!!!
```

The file *outputclue.sh* is a *bash* source file and matches the *md5sum* of each word in the *nextclue_input.cpp* to a local *checksum* variable named *bug*.
It keeps asking to fix *merge conflicts* until the word matching that checksum is present in the file.

```
#!/bin/bash
if [ -z $1 ]; then
  echo "well, someone didn't want to run the script with a file...";
  exit;
fi

file=$1
bug=7c85d987a917c2a555d1391426978f05
mesg="Linus has been here...\nI love messing with these amateur programmers!!\nIf you want some real fun, then you should try resolving a conflict between this branch (tree) and code4life.\nI introduced a little bug that you should fix in the conflict. >:)\nAfter you merge these 2 files you should run the shell script again!!\n\nGood Luck!!!"
merges=$(git log --format=%h --merges | head -1)
csum="md5sum"
if [ $(echo "$OSTYPE" | grep darwin) ];then
    csum="md5"
fi

if [ "$file" = "nextclue_input.cpp" ];then
  if [ ${merges} ]; then
    while read p; do
      for w in $p;do
        if [ `echo $w | $csum | awk '{print $1}'` = $bug ];then
          echo -e $mesg;
          exit;
        fi;
      done;
    done < $file ;
    echo -e "Well, congratulations!! You fixed my conflict!!\nIf you would like to continue, then you should checkout to the $(echo 90mP8ouQHsNe | tr -d '0-9A-Z') branch!!\n" ;
   else
     echo -e $mesg;
     exit;
   fi;
else
  echo "Looks like you passed in the wrong file";
fi
```

I saw that the *nextclue_input.cpp* file was having a line with an *infinite while loop* and my guess was right, the *checksum* variable matched the *md5sum* of the term *while(1);*

So to fix the *merge conflict*, I did ```git merge code4life``` and removed the faulty line; It worked like a charm.

```
Well, congratulations!! You fixed my conflict!!
If you would like to continue, then you should checkout to the mouse branch!!
```

> BTW! It was way more easy. As the answer branch was, mouse.
>
> ```$ echo 90mP8ouQHsNe | tr -d '0-9A-Z'```

When I *checked-out* to the branch *mouse*, it said :

```
nextclue_input.cpp: needs merge
error: you need to resolve your current index first
```

But you can get away without merging by *stashing the changes*, I did this with ```git add nextclue_input.cpp && git stash```.
Now the README.md file in branch *mouse* said :

```
git-game
========

Looks like you resolved your conflict and found our branch, congrats!!

Hmm...it seems this branch has a file that was seen before in another branch.
Do you "remember" what it is?
I think this file has something to do with the next clue, but it seems to be very ugly looking.
Maybe if we compare the "diff"erences between this file and the file from before we'll know where to go next...
```

Yeah! I do remember that the file *remember* was there in the branch *bug* as I wasted 10 minutes on it.

I did ```git diff mouse bug -- remember``` to see the difference between these two files accross branches and the difference in the files was this one line :

```
-Sn The next clue is: YtrydjKsYqebDoI3h bTINUeV6 pTVY8jnK2re HRwwNy25Ps6 u0YChCo5Jtw N3xkH3G nx aGo6yQTW RVZMsf3xk tBL0sG9GAR HQbyGYdqs i6dx1fyIPGJVci
+Sn In a branch named: Henry YtrydjKsYqebDoI3h bTINUeV6 pTVY8jnK2re HRwwNy25Ps6 u0YChCo5Jtw N3xkH3G nx aGo6yQTW RVZMsf3xk tBL0sG9GAR HQbyGYdqs i6dx1fy
```

So, the next *branch* to move was *Henry*, but ```git checkout Henry``` was a trap.

On *checking-out* it said, *You are in 'detached HEAD' state*; means we were not in a *branch* but *tag*. The README.md file was saying the same.

```
git-game
========

Welcome to my Tag!!!

If you're looking for my branch then you have gone the wrong way!!

How do you checkout to a branch that has the same name as a tag???
Deal with the tag first!!
```

The problem was that there was a *branch* with exactly same name as a tag, *Henry*.
So I *renamed* the *tag*, because *who knows when you're gonna need something?*

```git tag Henry-v0.1 Henry && git tag -d Henry``` made a new tag pointing to old's commit and deleted the old one.

Now after *checking-out* to the branch *Henry*, the README said :

```
git-game
========

Welcome!! It looks like you made it to my Branch!!!
Generally you want to refrain from making tags the same name as branches, unless you have a good reason.
The tag is more like the stable release.
While the branch is more like the in progress feature, which will be added soon.

You're almost done!! Excited?? Hope you are! You have one more thing to do!

Now its time to update the master branch, updating is really useful when you fork a repository and your forked repo starts to get behind on commits. The repository to update from is: https://github.com/drami025/git-game.git

Don't cheat!!
```

So, according to the task, to update the *master branch* I *checked-out* to it.

With ```git remote add updater git@github.com:drami025/git-game.git``` command, I added the new *remote* to update from, as the README.md said.

Then a simple ```git pull updater master``` did rest of the work and the *master branch* was equal with the new *remote*, all updated. \o/.

```
Git Game Finish Line
==========

If you did not fork this repository from the terminal, then we are disappointed in you!!
=======

However, if you did, then great Job!!
You completed our Git Game!
```

They have also implemented an [Open-Badge](http://openbadges.org/) for this, I got one.

> Finally, it's complete. And this Write-up too.
>
> I'm feeling pain in my fingers now.

---

### Behind the scene :

* Each level was somewhat harder than the previous one but overall it wasn't.
* Yeah! I completed all tasks *twice*, the extra one while writing this Write-up.
* It took me almost 30 minutes to complete all tasks but 2 hours to write this.
* Today, it's an awesome sunny, winter day here. :sunny:
