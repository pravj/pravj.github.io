+++
date = "2019-09-02T00:00:00+05:30"
title = "Opportunities in Indian railway commute: Next Billion Users perspective"
description = "Google's NBU strategy and the scope of utility-based applications for passengers"
tags = ["India", "Google", "Product", "Internet", "Accessibility", "Voice"]
+++

### Next billion Internet users (NBU)

Nearly one in every three people had access to the Internet at the dawn of this decade, which is now accessible to every other person. The situation is different for developing countries, where a significant population is still new to the Internet. In India, for example, there is around 65% of the population without this service.

<figure> <img src="/images/nbu-railways-internet-data.png">
    <figcaption>Internet penetration in the world (source: world bank)</figcaption>
</figure>

As the Internet has reached in most of the infrastructure-heavy parts of the world, it faces a challenging and different road ahead reaching in the developing areas (India, Indonesia, Brazil, and Mexico, etc.).

It opens up a challenge and opportunity for companies to get the market share from the potential new users. Both ~~Facebook~~ FACEBOOK and Google have done their part. FACEBOOK launched [internet.org](http://internet.org) (later renamed to Free Basics), which was [rejected by India](https://www.nytimes.com/2016/02/09/business/facebook-loses-a-battle-in-india-over-its-free-basics-program.html).

Google started a formal initiative under the name "Next Billion Users (NBU)," which aims to connect the isolated population and build products specific to them. It [acknowledges the fundamental differences](https://www.blog.google/perspectives/caesar-sengupta/next-billion-users-are-future-internet/) between the early adopters of the Internet and these new users.

> "The next billion users are not becoming more like us. We are becoming more like them." Ceasar Sengupta (Google)

### **Indian railway ecosystem: The NBU Sweet-spot**

The behemoth Indian Railways is, it moves around 20+ MM passengers daily. It operates more than 10K trains connecting between [8000+ stations](https://pib.gov.in/newsite/PrintRelease.aspx?relid=174916).

As per the official [report (page 6)](http://www.indianrailways.gov.in/railwayboard/uploads/directorate/stat_econ/IRSP_2016-17/Facts_Figure/Fact_Figures%20English%202016-17.pdf), non-suburban passengers (vernacular users) have been catching up with their suburban (city users) counterparts, which is a positive trend even after adjusting urbanization.

<figure> <img src="/images/nbu-railways-official-growth-figures.png">
    <figcaption>Indian railways growth figurs (source: facts & figures report 2016-17)</figcaption>
</figure>

Passengers in non-suburban trains (vernacular users) travel nearly a 10x amount of distance inside the train (longer average commute) as compared to their suburban (city users) counterparts.

Overall, these passengers represent a significant-sized target audience with a strong affinity to the users in context, the next billion users with a proper mix of the non-suburban and suburban populations.

Google has focused strategically on the railway ecosystem under its NBU initiative, validating this hypothesis.

<figure> <img src="/images/nbu-railways-google-strategy.png">
    <figcaption>Google's NBU strategy</figcaption>
</figure>

- [Providing high-speed public Wi-Fi in 400 stations across India](https://www.blog.google/technology/next-billion-users/bringing-the-internet-to-more-indians/), to help Google in bringing more Indians online
- [Acquiring the parent company of where-is-my-train application](https://techcrunch.com/2018/12/10/where-is-my-train-its-with-google-now/), to help Google understand the taste and usage patterns of those new Internet users at scale

### Possibility of utility services for passengers

Even after we ignore services offered by private organizations for a while, technology-based solutions aren’t quite new for railways, IRCTC (railways owned company managing the ticketing system) was one of the first portals in the country to adopt online payments. The ministry also operates a 24x7 Twitter cell, where passengers can complain via a tweet.

Still, I encountered multiple endpoints illustrating the knowledge gap between a (next billion user) passenger and the available information during my Diwali vacation (10% of what was spent traveling in one or another train).

<figure> <img src="/images/nbu-railways-opportunity-spectrum.png">
    <figcaption>Possibility of utility services for passengers</figcaption>
</figure>

In the sections below, I will attempt to explain the observations from a **Jobs-to-be-done (JTBD)** point of view, with potential solutions.

Feel free to discuss more on this in case I've picked something different from my limited exposure to the ecosystem (should have spent more time traveling on a train?).

<figure> <img src="/images/nbu-railways-jobs-to-be-done.png">
    <figcaption>Jobs-to-be-done framework (image source: medium.com/make-us-proud)</figcaption>
</figure>

### Connecting with nearby connected-passengers

Instead of a purely social context, I'm looking at it from a usefulness perspective also (the first job-story below). Let's talk about both possibilities.

<figure> <img src="/images/nbu-railways-woman-luggage.png">
    <figcaption>Connecting with nearby connections (passengers) for help</figcaption>
</figure>

This (the next example) has happened multiple times where I remember running into a known (inside the train or at the platform).

<figure> <img src="/images/nbu-railways-man-waiting.png">
    <figcaption>Connecting with nearby connections (passengers) for gossip</figcaption>
</figure>

In the recent journey, I observed both the scenarios, first helping an old-man by assembling his luggage, and second waiting at the station for my long-delayed train.

Both the passengers in these contexts could use a mechanism that informs them if someone in their network is around, at the platform or inside the train. It should be built on the core principle of give-and-take so that you can find connections only if you’re sharing your location information as well.

[WeChat's group chats are known to facilitate similar capabilities](https://a16z.com/2019/09/06/china-is-cashing-in-on-group-chats/) by creating forums of people present at the same location at the same time.

### Information Accessibility for all

Continuing on the same encounter with the old-man mentioned above, I observed that he had a hard time figuring out where is the train going to arrive (my train was almost 2 hours late, so I had enough time to observe all the things).

<figure> <img src="/images/nbu-railways-man-platform.png">
    <figcaption>Information accessibility for all</figcaption>
</figure>

Please note, this information is already available in multiple formats:

- You can ask the vendor or a nearby passenger if (s)he is in a mood to help you
- You can check the digital boards getting updated in real-time, not true always
- You can listen to the text-to-speech generated announcements, only if you manage to stand on one leg and concentrate enough to cancel out the background noise
- You can check the application (Where is my Train)

<figure> <img src="/images/nbu-railways-where-is-my-train.jpeg">
    <figcaption>Where-is-my-Train tracking details screen</figcaption>
</figure>

I believe my grandfather will have accessibility issues with the platform number shown in the application, even if he had a smartphone (he doesn't have one, neither did the old-man).

It can become difficult in a situation when you can't keep moving with the heavy luggage, and you are getting different responses every time you ask someone, all this on a crowded station.

From these two users' perspective, it would be great if they can engage with the solution conversationally.

- A button that speaks out the platform number in the selected language on a click
- A global (in-app) input element where you can speak in your queries (रणथंभौर एक्सप्रेस कोनसे स्टेशन पर आएगी?), the application can be smart enough to figure out which station in context
- An automated helpline where you can speak in your queries in your language for the narrow domain (We are building this as a platform at Vernacular.ai, let's connect if you're interested to know more)

### Utilising expert crowd, step ahead of the traditional core

The book “Machine Platform Crowd: Harnessing our digital future” talks about the “crowd” being superior to the traditional gatekeepers of knowledge (called the “core,” for example, a library).

On similar lines, the application also has certain crowdsourcing elements. For example, you can edit the platform where the train is coming. The main reason people loved the “Where is my Train” application is because it worked without the internet as well, utilizing the cell tower signals from people inside the train with the application.

There are multiple scenarios where the information available to one passenger on the train can be useful (life-saving at times) for another passenger. Assuming these contextual communities don't show bystander-effect and help the members, it can be useful for almost anything.

If the passengers in the following contexts can magically grow their connected network somehow to the complete train (or platform) and ask them for help, that will be amazing.

---

<figure> <img src="/images/nbu-railways-charging-point.png">
    <figcaption>Crowdsourcing charging-point details</figcaption>
</figure>

---

<figure> <img src="/images/nbu-railways-woman-son.png">
    <figcaption>Crowdsourcing missing-person search</figcaption>
</figure>

---

<figure> <img src="/images/nbu-railways-coach-seat-availability.png">
    <figcaption>Seat availability using crowdsourced data</figcaption>
</figure>

Google Maps recently launched an add-on to show the [transit crowdedness estimations](https://www.blog.google/products/maps/transit-crowdedness-trends-around/) in different parts of the world (haven't yet experienced this in India). I assume this information is better to be delivered individually instead of a full-blown broadcast.

### Complete transparency in delays

It's highly probable for your train to get delayed if it's connecting two stations far apart. Where-is-my-Train considers this by showing the scheduled and estimated arrival and departure time for a train at a station. The time is rendered in red if it's delayed and green if it's on time.

<figure> <img src="/images/nbu-railways-cross-stop.png">
    <figcaption>Information accessibility about train delays</figcaption>
</figure>

As per a [report by CAG](https://economictimes.indiatimes.com/industry/transportation/railways/cag-finds-out-why-trains-get-delayed-across-the-country/articleshow/65333672.cms?from=mdr), lack of available vacant routes is one major reason behind trains getting delayed. In such events, called “cross” in the railway lingo, a lower-priority train (passenger trains) needs to sacrifice (stop) and make way for a relatively higher-priority train (higher rank than passenger OR a delayed train at times). It’s common for passenger trains to spend 10-15 minutes extra in one cross.

Applications can either detect (by checking if a higher-priority train is about to cross, how much time will it take to arrive/cross) or crowdsource the reason behind the delay, with the tentative stop duration.

Crowdsourced transit app [Pigeon, developed within Google’s Area 120 lab](https://techcrunch.com/2019/11/05/pigeon-a-waze-for-public-transit-from-googles-area-120-expands-across-the-u-s/), is working on a similar goal to offer better transit information to riders.

<figure> <img src="/images/nbu-railways-google-area-120-pigeon.png">
    <figcaption>Accident details provided by Pigeon (source: TechCrunch)</figcaption>
</figure>

> The result is a transit app that can better inform users about unexpected incidents, as well as real-time crowds, and offer more context about delays. The app will also send out alerts to users about things like power outages or major service changes.

### Potential monetization method

If you aren't Google but plan to work on these (or different ideas with the same alignment) pointers, the monetization strategy will be one important question that you'll have to answer.

Other than advertisements with low ARPU and selling chat-based value-added-services similar to WeChat, the following is a possible monetization method.

- **To charge platform fee as a digital workforce provider**

Given the context, a passenger traveling long-distance will either opt-in for sleep or some entertainment as soon as the journey permits (unless she has something specific to do). People will start watching pre-downloaded videos or download them on the fly.

A majority of this user-base can be utilized as a digital workforce by giving them bite-sized gigs/tasks in the application itself. Advent in the [companies](https://playment.io/) [fulfilling](https://scale.com/) [data requirements](https://www.definedcrowd.com/) for sophisticated AI pipelines fits here perfectly where the users can start earning in exchange for their time (and data, at times) without much effort, and our next billion users will be more than happy to earn something as they travel.

 

### What's next

As new users are experiencing the Internet, we can expect more utility applications being built for them solving problems in niche areas of their daily life. It’ll be interesting to see the Wi-Fi project becoming self-sustainable (as mentioned by Sundar Pichai), and launch it in collaboration with multiple other human-hubs such as universities, malls, etc.

Till then, you are all green to go to the next station.