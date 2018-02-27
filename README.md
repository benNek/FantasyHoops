# README #

# git-schwifty

### Contribution guidelines ###

* Writing tests
* Code review
    - All Pull Requests should have at least 2 approval before merging.
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact

### Team members ###
- [Marius Jurkėnas](https://github.com/Jurkenas)		      - mjurkenas@gmail.com			      - +37060413922
- [Donatas Kareckas](https://github.com/donciakss)		    - donatas.kareckas@gmail.com	  - +37067732515
- [Mantas Naidzinavičius](https://github.com/Naidze)	  - naidzinavicius.m@gmail.com 	  - +37063361827
- [Benas Nekrošius](https://github.com/benNek)		      - benas@nekrosius.com			      - +37064355380
- [Paulius Prakapavičius](https://github.com/Prakapavicius)	  - p.prakapavicius@gmail.com     - +37063997646
- [Vilius Šapauskas](https://github.com/viliuusss) 		    - viliussapauskas2g2@gmail.com  - +37061251005

### Project setup ###

You are going to need following things:
* [Visual Studio 2017](https://e5.onthehub.com/WebStore/OfferingsOfMajorVersionList.aspx?pmv=4fec9f1d-6d0a-e711-9427-b8ca3a5db7a1&cmi_mnuMain=bdba23cf-e05e-e011-971f-0030487d8897&ws=80339d2a-7d92-e311-93fa-b8ca3a5db7a1&vsro=8)
* [SQL Server 2017](https://e5.onthehub.com/WebStore/OfferingDetails.aspx?o=f4b862bc-e6ad-e711-80f7-000d3af41938&ws=80339d2a-7d92-e311-93fa-b8ca3a5db7a1&vsro=8)
* [Node.js](https://nodejs.org/en/)

When installing SQL Server 2017, follow these steps:
* Select Installation -> New SQL Server stand-alone installation or add features to an existing installation
* Choose a free Developer edition
* From feature selection menu, tick only the Database Engine Services feature and click Next
* Select Default instance, Next, Next
* Add Current User, Next, Install

Pull latest version from Repo and open the project in Visual Studio 2017. Follow these steps in VS 2017:
* Tools -> Connect to Database
* Select Microsoft SQL Server and click Continue
* Server name: localhost
* Database name: fantasyhoops
* Click OK, The setup wizard should suggest you to create fantasyhoops database, accept
* Go back to Tools -> Connect to Database, type in localhost and fantasyhoops and click Test Connection. If you're getting that connection is successful, that means that database is ready to be used. otherwise contact Team Leader.
* Start the project and wait until you see the main page
* View -> Server Explorer and expand Data Connections and Tables. There should be Players and Teams tables, if you can see those tables that means you're good at following steps, Congratulations!


