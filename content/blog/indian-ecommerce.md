+++
date = "2015-12-11T00:00:00+05:30"
title = "Breaking into the Indian E-commerce"
description = "Lets find out how India shops and how big is Myntra"
tags = ["Data", "Python", "RethinkDB"]
+++

Before I start telling you the story, I'm going to do an experiment. I'll write the summary of this post first, just to stick you around, in case you are one among the people who don't read to the end.

### tl;dr

[Myntra](http://www.myntra.com/) is India's largest online fashion and lifestyle store, as they say. Which is owned by [Flipkart](http://flipkart.com/), one of the big players in Indian E-commerce.

I found a little opening in the flow of their online movement and used it to collect some information(*not private though*). Using this information we can see the way 'online shopping' is escalating in the country, and the role *Myntra* and the people are playing in it.

Sounds interesting? Hold on.

### Emergence of the idea

Let me tell you, how did I get started with this.

All this happened recently, when I was looking for some *T-Shirts* with my friend. We placed a shared order for two and a pair of shoes.

Whenever you order from Myntra, you get a *text message* on your registered mobile number, giving you a link where you can *track your order*. Each order is given a unique identifier of length 4 because it's a shortened URL to fit well in a text message.

I opened that link in my phone and it worked, saying that the details of your order are yet to be updated. Then I tried a different URL, not mine, of course, all thanks to my disruptive mind. It worked again, now this was something to pay attention to.

You know, 4 is a *nanoscopic* number if a computer is your best friend. I think you can guess what happened next, I couldn't sleep properly thinking about my next move to just have all the order details. Right from crawling and storing the data to analysing it.

### Crawler Infrastructure

Being a *pessimistic* person, as one of my friends calls me. I end up thinking too much about all the possible edge cases. Something similar happened with the design of the crawling system.

As the saying goes, **"A thief believes everybody steals"**. I was afraid that my collection signatures(IP) will be blocked.

If you have read my last post [Jump in to ride all the Bangalore taxis, at once](https://hackpravj.com/blog/bangalore-taxis/); I said that you should not hit the resource at a constant time period, it's a basic heuristic to identify bots. I considered that, it was a simple thing.

Now comes the main thing I was afraid of, *"What if they catch me while trying to collect all the orders in a sequential manner (alphabetically increasing uid)"?*

As I couldn't take a risk of losing the data, I designed my solution around it. I developed two things, *Engine* and *Station*.

*Engine* is the one who takes care of the identifier generation and distribution. It uses a little *group theory* and *anagram properties* to generate *non-sequential unique identifiers of fixed length*. It generates them in advance and serve you *on demand* while taking care of the stock by generating in the background when you start approaching the bottom of the vessel. To know more about *Engine*, you can stalk its [repository](https://github.com/pravj/engine).

*Station* is a Node.js package(*private obviously*) running a *Nightmare* instance for *headless browsing*. From *Engine*, it collects the next set of identifiers to fetch and then assemble all the necessary information before shipping it to the storage.

<figure> <img src="/images/crawler-infra.png"> 
	<figcaption>Crawler Design</figcaption>
</figure>

Together they solve the problem with sequential crawling.

Now one more thing, the collection signature(IP) is still vulnerable to blocking. I found a (working) solution for it right on the Engineering blog of Myntra. They have an interesting post named [Dynamic Bot Detection Using Bloom Filters](http://myntra.github.io/2015/01/19/dynamic-bot-detection-using-bloom-filters/), which labels you as a *bot* if you have sent relatively more requests in the past 60 seconds. So the time difference *station* assigns between two consecutive requests is dynamically set such that the *Bloom Filter* is unable to catch it.

Planning too much on the *Information Retrieval* part has been a good exercise though, I'm thinking about working on a *Machine Learning approach of Bot Detection*, where movement of a user from one page to another on service/website is mapped as *state transitions* of a *Markov Chain*, and anyone who violates the *transition probability range* is a suspicious visitor.

Rough idea, leave that for me.

### Statistical nature of the data

As I read more and more research papers and live next to some great statistician's *Internet Residences*, I know that you can't conclude *a thing* from a small dataset.

In the dataset that I have collected, there are 1045 *Returned Orders*, 4406 *Cancelled Orders* and 6368 *Completed Orders*. *Returned Order* means the package was returned back due to some reasons, and *Cancelled Orders* means it was cancelled by the customer before shipping.

This could have been a bigger one, so I'll try not to *conclude* a result here but we can see the customer behavior and the service *Myntra* provides. Coming to a result from this data would be a case of *overfitting* essentially.

Although the dataset is small, it's distributed over a *time continuum* instead of being a *discrete segment*, because of the internal working of *Engine*.

<figure> <img src="/images/engine.png"> 
	<figcaption>How Engine generate identifiers</figcaption>
</figure>

We are all set to take off now.

### When does India shops?

As long as I remember, I have ordered something online in the evening, around 06-07 PM. But this is not the case for everyone else.

<div>
    <a href="https://plot.ly/~pravj/51/" target="_blank" title="When does India shops?" style="display: block; text-align: center;"><img src="https://plot.ly/~pravj/51.png" alt="When does India shops?" style="max-width: 100%;width: 600px;"  width="600" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
    <script data-plotly="pravj:51"  src="https://plot.ly/embed.js" async></script>
</div>

We can see that there are two concerted segments. One from 09:00 AM to 05:00 PM in the evening and the other is from 06:00 PM to midnight. Not many orders are there during the *bed time*, after midnight till the dawn.

The morning peak is around 10:00 AM, which is near the usual opening hours of *Myntra's big discount sales*. *Returned Orders* are present throughout the days.

The presence of orders at every possible time of day shows the ease in the life of people using 'online shopping'. You have got a need and there are platforms to fulfill that. Otherwise, why would someone order at 02:00 AM in the morning?

*Myntra* also runs a *same day delivery* program where they ship your order in 24 hours, across the country. And in our dataset, a significant number of such orders were placed after midnight.

### From where does India shops?

<div id='customer-map' style="height:400px;"></div>

Here is a clustered map of places in the country, that I found as *final destinations* of *completed orders*. This means that the map ignores the number of orders at a place, it just represents the *geographic distribution* of the orders. Also, it doesn't count a locality multiple times. For example, *Agartala* has 2-3 different final destinations but they are clustered to a single place/centre, *Agartala COD Centre 3*.

I was magnificent to see this map when I plotted it first time. Not because my program worked, but to see the markers in extreme areas of the country, especially in the *Northeast India*.

It's good to see that almost every region of the country is here. There are 432 different places in here. You are free to zoom in and check out your region, if available.

After seeing this big coverage I would say, they can expand easily to *Bangladesh*.

I have used *Google's Geocoding API* to convert a place name to its coordinates.

### How long does it take to deliver your order?

<div>
    <a href="https://plot.ly/~pravj648/16/" target="_blank" title="How long does it take to deliver your order?" style="display: block; text-align: center;"><img src="https://plot.ly/~pravj648/16.png" alt="How long does it take to deliver your order?" style="max-width: 100%;width: 600px;"  width="600" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
    <script data-plotly="pravj648:16"  src="https://plot.ly/embed.js" async></script>
</div>

If you live in north India or near(*measured in terms of direct road connectivity*) the warehouses of *Myntra*, you *can* have your package in 24 hours. In the dataset, many orders from Nation Capital Region, Jaipur and Bangalore have delivered in the same day.

Otherwise, majority of the orders takes 3 to 4 days across the country, except the *North East*(Guwahati, Imphal) and *West Coast*(Mumbai Parel, Antop Hill) region.

I have calculated the delivery delay by subtracting the time of order being placed from the *last event time* in the events timeline of a *complete order*. The timeline consists of all the sub-details like *'Order is placed'*, *'Order is packed'*, *'In transit'*, *'Arrived at delivery center'*, *'Order out for delivery'* and *'Delivered'* etc. Which is *error prone* because they seems to update some order after awhile.

At the *tail* of the curve, the delay in some cases seems to be caused by customers actually, some reason were *'CID - COD(cash on delivery) AMOUNT NOT READY'*, '*Consignee Out Of Station; Shipment un-delivered*', '*Undelivered due to - Consignee Residence Closed*' etc.

### Shared Logistics

<div>
    <a href="https://plot.ly/~pravj648/145/" target="_blank" title="Shared Logistics" style="display: block; text-align: center;"><img src="https://plot.ly/~pravj648/145.png" alt="Shared Logistics" style="max-width: 100%;width: 1258px;"  width="1258" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
    <script data-plotly="pravj648:145"  src="https://plot.ly/embed.js" async></script>
</div>

Having a great logistics service is a key point for online shops. Both *Myntra* and *Flipkart* have their own such services named *Myntra Logistics* and *EKart Logistics* respectively.

To deliver products out of their range or to overcome the heavy demand during *big discount sales*, they ship the products with third party logistic providers.

In the dataset you can see that majority of the orders have been shipped by *Myntra Logistics* itself, and then by *EKart*. *Delhivery* is an emerging logistic solution provider in the country.

Here we can see the regions in which *FedEx* and *DTDC* were used for delivery.

<div>
    <a href="https://plot.ly/~pravj648/159/" target="_blank" title="Outsourced Logistic Partner Network" style="display: block; text-align: center;"><img src="https://plot.ly/~pravj648/159.png" alt="Outsourced Logistic Partner Network" style="max-width: 100%;width: 1258px;"  width="1258" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
    <script data-plotly="pravj648:159"  src="https://plot.ly/embed.js" async></script>
</div>

### 'End of Reason Sale' Purchase Behavior

'End of Reason Sale' (*EORS*) from 18-19 July was one of the biggest sales by *Myntra* in the year 2015. It was after when their previous sale faced criticism because of [technical glitches](http://timesofindia.indiatimes.com/tech/tech-news/After-botching-up-sale-Myntra-apologizes-to-users/articleshow/47528824.cms) in May 2015.

*EORS* started on 18th July from 08:00 AM. Here is a heatmap of order from dataset ranging from 17th July to 20th July.

<div>
    <a href="https://plot.ly/~pravj648/166/" target="_blank" title="EORS Purchase Behavior" style="display: block; text-align: center;"><img src="https://plot.ly/~pravj648/166.png" alt="EORS Purchase Behavior" style="max-width: 100%;width: 1258px;"  width="1258" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
    <script data-plotly="pravj648:166"  src="https://plot.ly/embed.js" async></script>
</div>

We can see a pattern similar to the *sale days* for 20th July, which supports the notion that *EORS* was [extended after its official period](http://webcache.googleusercontent.com/search?q=cache:DuSB-kY2Il4J:https://batch.com/insights/push/ey8v28jv00zd+&cd=7&hl=en&ct=clnk&gl=in) for some styles.

### Brands on the platform

*Myntra* being an online shopping service mainly, also [owns in-house fashion brands](http://www.rediff.com/business/report/myntra-to-have-usd-100-mn-in-house-brands/20150805.htm) like Roadster, Dressberry, Anouk (for women), Mast & Harbour, Kook N Keech, Yellow Kite (for kids) and Invictus etc.

Here is an *approx* gender segmentation of brands(top 50 in the dataset) on the platform.

<div>
    <a href="https://plot.ly/~pravj648/105/" target="_blank" title="Gender Segmentation of brands" style="display: block; text-align: center;"><img src="https://plot.ly/~pravj648/105.png" alt="Gender Segmentation of brands" style="max-width: 100%;width: 600px;"  width="600" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
    <script data-plotly="pravj648:105"  src="https://plot.ly/embed.js" async></script>
</div>

### Do small shopkeepers purchase online to sell in their locality?

What do you generally purchase online? Whatever it's, but you don't actually buy 3 shirts of the same type, do you?

This is something I found suspicious when I was looking in the dataset for orders having a lot of products in one shipment.

<figure> <img src="/images/bulk-order.png"> 
	<figcaption>Does small shopkeepers purchase from Myntra to sell in their locality?</figcaption>
</figure>

This picture shows products in a shipment which contains shoes only, of similar types.

Although it's exactly how the selling process works, you buy from a person and sell to someone else. But in this case, it seems weird to me.

I thought 'online shopping services' are just adjacent node to us on the *Internet Services Graph* and this is how people use it. This indicates towards the existence of a community which is still away from the Internet, its benefits and is being cheated. Cheating in the sense that shopkeepers may buy from online services during sales and then sell them at relatively high prices to local customers.

### Inference

Although I have said that I won't conclude results from this data, but I guess we can't deny some facts.

'Online Shopping' is a perk that the boom on Internet and Startups has given to the country. It's shaping the economy by creating a variety of employments. Still a lot of people are yet to go through this makeover.

As the number of Internet users is growing in the country, we can expect more good to happen.

### Probable Fix
 
I think a simple solution can be employed here to avoid intruders.

To ask for the associated *mobile number* while checking details of an order, if the user is not logged in. One can guess the *unique id* for orders but not the *mobile number*.

### Disclaimer

This is going to be a little contradictory. According to Oxford Dictionary, *Disclaimer* means "*A statement that denies something, especially responsibility*".

I won't do that. This time again, I'm aware that such collection of data is a wrong act in *Internet terms*. But I can't control myself when I get such an idea and some questions that can only be solved by visualizing the data, referring to [Anscombe's quartet](https://en.wikipedia.org/wiki/Anscombe%27s_quartet). I just wish I'm not getting prosecuted for this. The dataset doesn't contain any private information(*name, mobile number, home address*) of someone, *it's not at all available.*

Remember the [Engine](https://github.com/pravj/blitz.engine) and *Station*? I have decided not to open source the *Station*, which was used to collect the data. Almost all programs I have used to *analyse* the data are available at [Fuel](https://github.com/pravj/Fuel), without the actual data I have collected.

If you are reading this, you have passed my experiment. Let me gift you a free <b>Happy New Year</b> wish.
