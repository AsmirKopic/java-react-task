# Certifications management app

Management/CRUD application built using Spring Boot and React-typescript with PostgreSQL database.

**DEMO**
- Deployed to Heroku Cloud:

https://cert-management-frontend.herokuapp.com/

**Note:** It is running on a free dyno, so the services go to sleep if not in use.
       For the first time, it may take some time to respond.

**FEATURES**

- Stores/Edit/Delete certificate information in the PostgreSQL database.
- Modal window for Supplier lookup with search filters to select Suppliers based on entered fields.
- Upload image with preview (store in database is not supported yet)
- Multi language support. Choose between English and German locales.
- Modal window with search filters to select multiple Person based on entered fields and add/remove selections in attendee table.
- Add multiple comments, by multiple users.


**TOOLS USED**

- **React:** typescript Front-end Javascript framework.
- **Spring Boot:** Back-end JAVA framework to build microservices using Spring Rest Controller and Spring JPA.
- **PostgreSQL:** Stores new Certificate information.
- **Heroku Cloud Platform:** Deploying microservices on Heroku both Back-end and Front-end supported with PostgreSQL-heroku addon.

