INSERT INTO listing 
(propertyName, propertyDescription, address, city, state, zip, imgURL, loanAmount, monthlyMortgage, desiredRent)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);