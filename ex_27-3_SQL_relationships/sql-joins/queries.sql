-- Join the two tables so that every column and record appears, regardless of if there is not an owner_id . Your output should look like this:

SELECT * 
FROM vehicles
FULL JOIN owners
ON vehicles.owner_id = owners.id

-- Count the number of cars for each owner. Display the owners first_name , last_name and count of vehicles. The first_name should be ordered in ascending order. Your output should look like this:

SELECT first_name, last_name, COUNT(*)
FROM vehicles
LEFT JOIN owners
ON vehicles.owner_id = owners.id
GROUP BY last_name, first_name
ORDER BY first_name ASC

-- Count the number of cars for each owner and display the average price for each of the cars as integers. Display the owners first_name , last_name, average price and count of vehicles. The first_name should be ordered in descending order. Only display results with more than one vehicle and an average price greater than 10000. Your output should look like this:

SELECT first_name, last_name, CAST(AVG(price) as int) average_price, COUNT(*)
FROM vehicles
LEFT JOIN owners
ON vehicles.owner_id = owners.id
GROUP BY last_name, first_name
HAVING AVG(price) > 10000
ORDER BY first_name DESC


