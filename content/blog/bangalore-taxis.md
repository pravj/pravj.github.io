+++
date = "2015-09-01T00:00:00+05:30"
title = "Jump in to ride all the Bangalore taxis, at once"
description = "Things you see when you get into the map"
tags = ["Data", "Mapbox", "RethinkDB", "R"]
+++

All right, just imagine that you have popcorn with you, because I know that you don't have.

I decided to do this report when I was in Bangalore this summer, *Sillicon Valley of India*. You can observe a gob of information flowing through in such metropolitan population. People ordering/delivering meal, groceries or literally everything by online orders, people booking a vehicle and riding in no time, people booking a seat for dinner/movie and many more thing to generate the logs. Which is fascinating.

One day while riding a cab, I got this plan to go into the rectangle map the app was showing, and run around. Just like what [Joey did in an episode of Friends](https://www.youtube.com/watch?v=oKCIMX2dsEc).

To execute this all, I had to collect the relavent information and work on the possible outcomes of the collected information.

Here in this post I have written the procedure I followed, things I have feared of, interesting results I saw and count of tea cups I have sipped.

### The brick wall

A little more theory and then we will get right to the practicals.

While setting up the collection infrastucture, I realised that I might be under the *terms and services* monster. This suspicion helped me lading in the depression zone where I wasn't sure if the work I have done so far was worth doing or not.

I thought about asking the respective organization for a permission but I was too afraid to hear a negative reply. So I went ahead and ignored this. Because this report does not publicize any private property like vehicle numbers, mobile numbers and all. Even I wasn't able to access such private properties.

The major reason was, I have already bunked too many classes for this, so terminating the work wasn't an option.

I'm aware that it's a wrong act but I couldn't stop the *David McCandless* inside me from doing this. I hope I'm not getting sued for this.

> This report is based on the data from a particular taxi service in a single day's time span, so it may be a little baised.

### Information Retrieval

Collecting the right information was the foundation for the whole game. Possibility of getting blocked was also there, once you come under the *Night's watch*.

The task reduces to finding *how many taxis are there in the city* (at a time), *where they are* and then keep doing this all the day *without getting caught*. Easy Peasy?

I came up with the solution to find places in the city which are equally seperated and then drawing circles on those points would cover the entire city. A fake *cab search request* would return us the status of cabs around that place.

For that I planned to start from the center of the city, iterate this on adjacent places using a [Finite State Machine](https://en.wikipedia.org/wiki/Finite-state_machine) to stay aware of the ending state (when we are done with all such place-combinations) and state changes (when we are out of the city's boundary in a particular direction).

While writing the FSM, I found an efficient alternative to iterate over all the equally separated places which comes under the [Minimum Bounding Rectangle](https://en.wikipedia.org/wiki/Minimum_bounding_rectangle) of Bangalore, and check if the cab service is available in that area or not.

Equally spacing those spots minimizes the total number of requests made, which descreases the chances of getting blocked, *if there is such service on the other side*.

<figure> <img src="/images/point-net.png"> 
	<figcaption>Equally separated places</figcaption>
</figure>

Once all those places were spotted, I made a *cab search request* on all those spots every 15 minutes. I think it's a bit more time than the *average trip duration*.

Later I realised a mistake that I have forgot to count the time making requests to all the places, so the separation went up to almost 19 minutes.

I continuously pumped all those responses to a [IronMQ](http://www.iron.io/mq/) powered message queue and then imported all the data into a local [RethinkDB](http://rethinkdb.com/) instance.

> One should try not to hit the source at a constant timeperiod (like 15 minutes in this case), because that's the basic heuristic for smart *bot detection* systems. I had to do that because it was needed.

### Service Availability

In the *Minimum Bounding Rectangle*, I found a total of 272 spots but only 96 of them have the cab service available. The distance between adjacent places is 2 Mile (3.2186 KM.), which is almost same as the equivalent area we see while booking a cab on mobile applications (on default zoom level).

<div id='availability-map' style="height:400px;"></div>

Although this is biased because it represent only a single day of activity but it gives us a little overview of the situation. I'm not that familier with the places in the bangalore but I found an interesting thing, maybe a native resident can confirm this.

See those two circles at the top of the rectangle, they are too far from the main localities but we have the service there. Those circles contains places like *Rajanukunte*, *Doddajala*, *Chikkajala* etc. On googling their name, you will get comparatively more listings about property/real-estate business compared to other areas in the city.

It's like the scenario we had with *Delhi - Gurgaon* some time back, those places are under *Industrialization*. Which makes it a good reason to have the taxi services availability, no matter some famous places around the city doesn't have this cab service, like the *Bannerghatta National Park*.

### Guardians (Vehicles)

During the day, the system spotted a total of 897 different cabs, with 4 different types.

> *RethinkDB query* to count different type of cabs.

```
r.db('taxis').table('datacenter')
	.filter({available: true})
	.pluck('type', 'cab_id')
	.distinct()
	.group('type')
	.count()
```

<div class="row">
	<div class="col s12 m6 l3 center-align" style="color:#DDD;background:#00648C;">
	  <h4>#Hatchback 525</h4>
	</div>
	<div class="col s12 m6 l3 center-align" style="color:#DDD;background:#10698C;">
	  <h4>#Sedan 324</h4>
	</div>
	<div class="col s12 m6 l3 center-align" style="color:#DDD;background:#4F7B8C;">
	  <h4>#Nano 46</h4>
	</div>
	<div class="col s12 m6 l3 center-align" style="color:#DDD;background:#7497A5;">
	  <h4>#SUV 2</h4>
	</div>
</div>

### Cab Availability (according to time)

What do you think about the number of cabs available at 8:30 AM and 8:30 PM? You will see that the number is more in the morning.

There is a theory, *Utilitarianism*. Which states that everyone wants to maximize their utility. Take the example of E-commerce. Between so many brands, sellers and customers, everyone wants to increase their benefits. For e-sellers, scheduling an online sell is just like a game of chess. Each team want to win it. (Quoted by a good person)

Here is how the cab availability distribution over time looks like.

<figure> <img src="/images/distribution.png"> 
	<figcaption>Cab availability distribution over time</figcaption>
</figure>

I think it goes like, the probability of a taxi being hired is high during the morning when people are going to the office/college, then it decreases during the noon-time, increases again during the 4 PM - 6 PM window when people are going back home or going out for their evening gig, and decreses in the night.

This is how drivers play their part as per *Utilitarianism*, which reflects in the number of available taxis.

### Rise of the Guardians (Vehicles)

In the responses I got for the cab search requests, there was a field representing a timestamp, constant for a particular cab. Initially when I saw that, I thought it's the last time a cab was booked but it wasn't.

5 out of the 897 total cabs have that field equal to 1, which translates to January 1, 1970. This indicates that initially the field wasn't part of their architecture, but later they adopted it.

The uniqueness and time range of all those fields strongly supports that it was the time when a cab got associated with the organization. 

<figure> <img src="/images/cab-timeline.png"> 
	<figcaption>Cab timeline</figcaption>
</figure>

Horizontal scale for this graph is cropped because almost 85+ % events belongs to the year 2015 itself. Which seems a bit weird, but it's what it's.

### Cabs around the city throughout the day

<div id='map' style="height:400px;">
	<span id='info' class='info' style='padding:10px;background:#fff;position:relative;top:17px;right:-50px;z-index:100;'></span>
</div>

This particular map represents the geographic view of the *cab availability* (according to time) diagram. Where total cabs at a time are distributed accross the city according to their actual positions.

Now if you are thinking about the places where most of the cabs are, I have created another map for that, scroll down.  

### Cab Availability Index

This map is somewhat inspired from the Housing's [Child Friendly Index](https://housing.com/blog/2013/11/14/launching-child-friendliness-index-heat-maps/).

It uses those equally seperated circles to count total cabs in them throughout the day, and uses the relative percentage as the opacity of each circle.

> *RethinkDB query* that counts the cabs which are in a 2 mile circle centered at 'centerPoint'.

``` javascript
r.db('taxis').table('datacenter')
	.filter({available: true})
	.pluck('cab_lat', 'cab_lng')
	.distinct()
	.map(function(instance) {
		return r.circle(centerPoint, 2, {unit: 'mi'})
			.includes(r.point(instance('cab_lat'), instance('cab_lat')))
	})
	.count(true)
```

<div id='dmap' style='height:400px;'>
</div>

Neighbourhoods having maximum availability index are mostly in the *northern-western* and a little *central* part of the bangalore. Which consists of some big educational institutes as *Indian Institute of Science*, *Bangalore University*, *R.V. College of Engineering*, some famous tourist spots as *Lalbagh Botanical Garden* to contribute to the higher availability density.

Along with that, reports shows that *northern-western* bangalore has maximum population density in the city. Check out these images (<a href="http://wgbis.ces.iisc.ernet.in/biodiversity/pubs/ETR/ETR55/Population%20Density.jpg" target="_blank">latest</a> and <a href="http://wgbis.ces.iisc.ernet.in/biodiversity/pubs/ces_tr/TR118_SPoonancha/Index1_clip_image002_0000.jpg" target="_blank">old</a>) from *Centre for Ecological Sciences, IISc* for the reference.

### Cab that travelled the most

As I have told you that initially I'd misread a timestamp field as the time when a cab was last hired. Writing a precise (almost) algorithm to find the path travelled by cab using current/past location and the last booking time would have been easy that way.

In the currecnt implementation, I have used the locations between adjacent appearances of a cab to find the approximate distance travelled by the vehicle. It assumes that the cab travelled from position A to position B despite being sufficient time difference between both appearances.

> *RethinkDB query* that collects the chronological appearances of each taxi.

``` javascript
r.db('taxis').table('datacenter')
	.filter({available: true})
	.without('id', 'place_lat', 'place_lng', 'duration', 'distance')
	.group('cab_id')
	.pluck('cab_lat', 'cab_lng', 'index', 'timestamp')
	.orderBy('index')
```

To watch the jounrney *time-lapse* of the cab who travelled the most, press the *play button* below.

<div id='cmap' style='height:400px;'>
</div>

<div style='width:60px;margin: 0 auto;'>
	<h2 id="replay-btn" style='position:relative;top:-100px;padding-left:15px;color:#343434;background-color:rgba(255, 255, 255, 0.8);width:60px;height:50px;cursor:pointer;'>
	  	<span class='ion-play'></span>
	</h2>
</div>

### Is this all fake, just like Uber illusion?

Do you remember those *phantom car* stories of Uber?

There was a research which revealed that Uber shows a mirage of tiny black cabs moving around you, when you do a cab search. Just to convince you that a cab is there for you. Study concluded that the cab network you see around, is not real-time.

I wanted to analyse the *traffic status* using the response data I had. My objective was to find the regression in the *cab response time* (time taken by a cab to reach you) and *time of the day*. Because the sixth sense says that the *cab response time* should be high when there is *high traffic* in some areas of the city, likely in those peek hours (morning and evening time).

The *cab response time* seems to be dependant on the distance only, which looks like a *step function*.

<figure> <img src="/images/restime.png"> 
	<figcaption>Cab Response Time</figcaption>
</figure>

I realised that there wasn't any fluctuation in the *response time*, it was same for a particular distance between the cab and the user (simulated), all the day.

> Which implies that similar to Uber, this cab network isn't real-time.

A nice explanation of the *phantom cars* is available [here](http://motherboard.vice.com/read/Ubers-phantom-cabs?update).

### People don't solve a problem until they get one

This simulated user interaction is wrong to the system. Can be easily converted into a *service denial*.

In my case, I was changing the user(simulated) location frequently, so fast that a human can't reach there in a fraction of second (traversing whole Bangalore in 3 minutes).

If the service allows a user to book a cab for someone else (who is far away from where the real user is), the monitoring system should take care of the conversion rates. Someone trying to book a cab for someone else this fast, then not booking a single cab, and then repeating this every 15 minute all the day is a plain pattern to detect. Which should be detected. I hope somebody will fix this.

---

That's it, get out of the cab now.

I have decided not to release the collected data and code for the data retrieval. Everything else including the data processing part can be found at [pravj/bangalore-taxis](https://github.com/pravj) repository. Thanks to *RethinkDB* and *Mapbox*, you guys are really amazing.

<script src='https://cdn.rawgit.com/pravj/pravj.github.io/8d913abaf8bbe8dab7d05a1a918760af6ac423df/public/lib/taxis.js'></script>

