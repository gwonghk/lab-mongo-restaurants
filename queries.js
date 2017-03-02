// Warm up

// List out all available cuisine from the whole dataset and sort them in alphabetical order (Hint: read this).
db.getCollection('restaurants').distinct('cuisine').sort()

// Find out all available cuisine from the restaurants that are located on Cross Bay Boulevard and whose address uses zip code 11414
db.getCollection('restaurants').distinct("cuisine",
    {
        "address.street": "Cross Bay Boulevard",
        "address.zipcode": "11414"
    }
)
// Find the name and address of the Steak House owned by your WDI-HK-10 instructor 'willie' (Hint: You may want to use regular expression).
db.getCollection('restaurants').find(
    {
        $and: [
        	{name: /Willie/},
        	{name: {$regex: "Steak"}}
        ]
    }
)

// List out the name of all restaurants which contain the word Pizza in the cuisine but DO NOT contain the word Pizza or Pizzeria in the restaurant name (Hint: use regular expression).
db.getCollection('restaurants').distinct('name',
{
    $and:[
            {'cuisine': /Pizza/},
            {'name': { $not: /Pizza/}},
            {'name': { $not: /Pizzeria/}}
         ]
}).sort()

// List out the name of all straight A (i.e. the restaurant has only received A grade ever) restaurants which contain the word Pizza in the cuisine and are located in the Queens borough (Hint: you may want to first find out how many available grade values we have in the entire dataset).
// Hamburgers
db.getCollection('restaurants').distinct("name", 
{
    $and:[
            {'cuisine': /Pizza/},
            {'borough': 'Queens'},
            {'grades.grade': { $not: /B/}},
            {'grades.grade': { $not: /Z/}},
            {'grades.grade': { $not: /C/}},
            {'grades.grade': { $not: /P/}},
            {'grades.grade': { $not: /Not Yet Graded/}}
         ]

})

// You are hungry and feel like having a hamburger. Find the number of restaurants listed Hamburgers as their main cuisine.
db.getCollection('restaurants').find(
{
    'cuisine': /Hamburgers/
}).length()


// Geez, there are way too many of them. Let's narrow down our search. You are in Manhattan right now so let's find how many restaurants listed Hamburgers as their main cuisine in the Manhattan borough.
db.getCollection('restaurants').find(
{
    'cuisine': /Hamburger/,
    'borough': /Manhattan/
}).count()

// Let's have something nice and get rid of the McDonald's in the results. Find how many restaurants listed Hamburgers as their main cuisine in Manhattan and exclude all Mcdonald's (Note: In the data set, McDonald's was presented in inconsistent ways, e.g. McDonald's and McDonald'S. So please use the regular expression /McDonald/ in your query).
db.getCollection('restaurants').find(
{
    $and:[
        {'cuisine': /Hamburger/},
        {'borough': /Manhattan/},
        {'name': {$not: /Mcdonald/}}
    ]
})


// Hmm... we are getting closer. Let's also get rid of Burger King as well.
db.getCollection('restaurants').find(
{
    $and:[
        {'cuisine': /Hamburger/},
        {'borough': /Manhattan/},
        {'name': {$not: /Mcdonald/}},
        {'name': {$not: /Burger King/}}
    ]
}).count()

// There are still plenty of choices. Maybe you should just pick one closer to your home. Find out the list of distinct street based on the results of Question 4.
db.getCollection('restaurants').distinct("address.street",
{
    $and:[
        {'cuisine': /Hamburger/},
        {'borough': /Manhattan/},
        {'name': {$not: /Mcdonald/}},
        {'name': {$not: /Burger King/}}
    ]
}).sort()

// Alright, you are just a block away from Pearl Street. Find the name of the Hamburger restaurant (i.e. your query should return the name of the restaurant only) on Pearl Street. Your query should now yield exactly one restaurant. What is it? (Submit the query and also the name of the restaurant as a comment)
db.getCollection('restaurants').distinct('name',
{
    $and:[
        {'cuisine': /Hamburger/},
        {'borough': /Manhattan/},
        {'name': {$not: /Mcdonald/}},
        {'name': {$not: /Burger King/}},
        {'address.street': 'Pearl Street'}
    ]
})

// Hard (You need to do some research first)
// Find the name of the restaurants which listed Japanese as their main cuisine and have exactly 9 grades.
db.getCollection('restaurants').distinct('name',
{
    $and:[
        {'cuisine': /Japanese/},
        {'grades': { $size: 9}}
    ]
}).sort()