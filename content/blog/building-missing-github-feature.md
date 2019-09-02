+++
date = "2019-09-02T00:00:00+05:30"
title = "Using GitHub to build a missing GitHub feature"
description = "A feature that is missing from GitHub and my product-first approach to building that as a side-project"
tags = ["GitHub", "Product", "Open Source"]
+++

After the Microsoft acquisition, GitHub has been on a roller coaster ride. It has been winning the developer community’s affinity by launching a series of offerings, one after another, starting from the free private repositories to the GitHub Sponsors program.

Still, there are unmatched expectations that users have from the hub of open-source. This guide is about one such expectation, a feature that is missing from GitHub and my product-first approach to building that as a side-project.

<figure> <img src="/images/follow-github-organization-header.jpeg">
    <figcaption>Can you listen to the birds chirping in the background?</figcaption>
</figure>

### All that is missing

Started as a code hosting platform for the Git version control system, GitHub has evolved into a complete software development platform. It fits perfectly in the software development lifecycle that people have started using it in multiple ways (*blog for some other day on the wild network effects of GitHub and its use of social incentives*).

Isaac's <a href="https://github.com/isaacs/github" target="_blank">repository</a> is one such corner of the platform where people come to request new features, they create an issue for what they want and thumbs up each other's comments, hoping that GitHub will listen to their requests. It does. Support for reactions is my favorite feature that was implemented after getting noticed from here.

<figure> <img src="/images/issues-for-github.png">
    <figcaption>Snippet from the README document for Isaac's repository</figcaption>
</figure>

### Finding what to work on

> Know your customers wherever they are.

*Want to know what's wrong with a product, head straight to the user forums or customer feedback channels, and you will get the answer.*

More than a year ago when I was looking for a side project to work on, this repository was the correct place to find out the missing pieces related to GitHub.

Now comes the much anticipated missing feature, *the ability to follow an organization*.
Yes, you can't follow an organization like following a normal user account to receive user-activities. It's the most-commented issue on Issac's repository.

<figure> <img src="/images/github-issue-follow-organization.png">
    <figcaption>Issue requesting feature to add ability to follow organizations</figcaption>
</figure>


GitHub shows you user-generated activities (creating, starring, and forking repositories, etc.) in your main feed, which allows people to discover new things (read my other blog <a href="https://hackpravj.com/blog/information-dynamics-on-github/" target="_blank">Information dynamics on the GitHub network</a> for details). But there is no way to subscribe to an organization and receive events when something happens in it (for example, when a new repository is created).

### Are you bored right now?

If you don't care to read more about the development process, you can skip this and check out <a href="https://followgithub.org" target="_blank">followgithub.org</a>, browser extension that allows you to follow a GitHub organization. It's <a href="https://github.com/follow-github-organisation/fghx" target="_blank">open-source</a> as well, feel free to hack on it during weekends.

<figure> <img src="/images/follow-github-org-website.png">
    <figcaption>followgithub.org</figcaption>
</figure>

### The real MVP

Once the idea was shortlisted, it was time to work out a plan to manage risk by prototyping early and cheaply, the risk of shipping the wrong stuff that nobody wanted in the first place.

Given the motive, I aimed to spend as little time as possible on the implementation to get the initial version to validate the hypothesis. One, there weren't enough resources to pull this off as I was working on it on Sundays, that too sporadically. Another, Steve Blank wouldn't agree.

> Think about cheap hacks to test the goal, keep the eyes on the prize.

I found that the solution will involve activity-checker polling for new events at its core, but notifying the users about an event is going to be the major deal.

I was fiddling with some typical and atypical distribution channels such as Email alerts (*where the events are being sent to a verified email address*) and Twitter bot (*to keep updating a thread for an organization OR responding to tagged questions*). But none of them was a convincing idea because it would bound the solution in one particular way before even getting buy-in from the potential users.

That's when I realized that I was looking outside, but the real distribution channel was in front of my eyes, GitHub. It's a place to position your product for the right people in itself. It has a social pull that brings a community closer, generating value for each other; for example, <a href="https://github.com/topics/awesome-list" target="_blank">awesome-lists</a>.

And here comes the MVP, a <a href=""https://github.com/follow-github-organisation/follow-github-organisation target="_blank">GitHub repository</a> acting as a user forum.

<figure> <img src="/images/follow-github-org-mvp-version.jpg">
    <figcaption>Using GitHub as the distribution channel for followgithub.org MVP</figcaption>
</figure>

This saved me from investing in email notification services or choosing a channel where none of the potential users are (Twitter).

It was <a href="https://news.ycombinator.com/item?id=19261376" target="_blank">shared on Hacker News</a> by my friend Amit, leading to some early adoption.

### Tweak it

After a few days, I started interacting with people using the setup for the next iteration. About both the good and the bad parts; how they are excited to follow an organization, and how the issue thread is adding duplicate comments or missing beats.

For this, I prepared a series of questions aligned with The Mom Test by Rob  Fitzpatrick.

- Open-ended questions, what has changed because of this setup
- Daily habits, how exactly do they use GitHub in life
- Specifics from the past, how did they find their (recent) favorite GitHub repository

I realized the current setup was doing a bad job at user experience. Neither the notification delivery (for a new repository) system was providing a native GitHub experience aligned to their browsing habits. It required you to take multiple actions to follow an organization.

- Find if there exists an issue for the organization you want to follow
- Create an issue with adding the link for the organization in the comment

Then one day a friend pointed me out to *refined-github* during a discussion, a famous browser extension that simplifies the GitHub interface and adds useful features. And that's when I found the real distribution channel resonating with all the requirements.

A browser extension that allows you to follow GitHub organizations in your sleep.

<figure> <img src="/images/github-follow-action.gif">
    <figcaption>Just follow an organization by clicking the follow button, what else?</figcaption>
</figure>

<figure> <img src="/images/github-new-repo.png">
    <figcaption>A new repository in the organization will be added to your main GitHub feed</figcaption>
</figure>

### Extensions and skepticism

During my interaction with potential and existing users, I observed that not everyone has a virtuous view of browser extensions. Some of the users have strong opinions against them because of potential security risks.

That's why I decided to <a href="https://github.com/follow-github-organisation/fghx" target="_blank">open-source</a> the extension and it's being built out in the open.

### Path to ramen success

As mentioned by <a href="https://www.indiehackers.com/interview/sidekiq-6e71309457" target="_blank">Mike Perham</a>, people start something valuable with enthusiasm and give it for free, only to get overwhelmed by support requests and burn out of the project.

I realized that it's the right time to put a price tag on all the time spent on the development, at least to pay the server bills. I will consider this a ramen sustainable success in two possible scenarios:

- GitHub builds this feature
- I stop investing on the product from my own pocket to sustain it

### Putting the right price tag

After deciding the path for ramen success, it was time to put the right price tag. I was reading about different pricing mechanisms (The anatomy of SaaS pricing strategy) and found every coin has two sides to it.

- **Cost-plus pricing**: isn't a calculated decision if the product depends on external factors. Also, your customers don't care about your costs.
- **Value-based pricing**: isn't easy all the times to quantify the value being generated by your product. But it validates their willingness to pay, if there is a value in it.

Logically, I decided to go ahead with the value-based freemium pricing structure as it felt like the right move in the given context. But this required me to come up with metrics to define the value generated by users.

In this case, the total number of organizations followed was the fitting value metric.
I have kept the bar at 10 organizations in the "adopter" version for the following reasons:

- You should not give up too many things for free
- It was close to the following count of some new users (in a small sample set)

<figure> <img src="/images/follow-github-org-pricing-model.png">
    <figcaption>Pricing model for followgithub.org</figcaption>
</figure>

### Incentive flywheel

Everyone has their own strategy to get the first 10 or 100 customers, different for the kind of product you are building, this is mine.

Given GitHub has a strong social-capital game in place (*might not apply to all the GitHub users*), one would want to generate value by creating or contributing to an existing repository, in return for a special status in the topology. Encouraging more members to join the value-generation efforts in the connected network, and bringing more members into the userbase.

And for that, I've kept an incentive for contributions to the extension. A free supporter license key for <a href="https://allcontributors.org/" target="_blank">any legit contribution</a> you make to it.

<figure> <img src="/images/follow-github-org-contribution-incentive.png">
    <figcaption>Contribute to the extension and win a supporter license key</figcaption>
</figure>

All kinds of contributions are welcome as long as it's beneficial for the end users.

<hr>

That's it, please let me know what do you think of the extension.

Reach out to me at <a href="https://twitter.com/hackpravj" target="_blank">@hackpravj</a> (<a href="https://twitter.com/followgithuborg" target=_blank">@followgithuborg</a>) or followgithuborg@gmail if you come across any issue or suggestion for the tool. I would love to make it better for you.

If you want to win the supporter license key, head straight to the <a href="https://github.com/follow-github-organisation/fghx" target="_blank">repository</a>.
