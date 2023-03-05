# Ecommerce website
Fully functional e-commerce website with back-end using Django and front-end using React. Integrated with Stripe for payments and used React-bootstrap components for styling. Project is live at: [https://proshop-web.vercel.app](https://proshop-web.vercel.app).

## Demo video
https://user-images.githubusercontent.com/84830429/222736252-235eb893-a296-430f-9c7f-123fc31cedd6.mp4

## Instructions
To run this project locally on your machine,
1. Clone this repository.
2. Make sure you have python and node installed.
3. Open this project and run following cmd to install dependencies:
```
pip3 install requirements.txt
```
4. Create a .env file with contents as .env.example file.
```
SECRET_KEY=
DEBUG=
STRIPE_API_KEY=
DATABASE_URL=
```
In case you do not want to provide a database url, uncomment line 87 to 92 in settings.py file.
https://github.com/VaibhavArora314/drf-react-ecommerce/blob/d31c3537eeaf6fe894a4a3be0b6b3ac6f47dbe9b/backend/settings.py#L87-L92
Also comment line 94 in same file.
https://github.com/VaibhavArora314/drf-react-ecommerce/blob/d31c3537eeaf6fe894a4a3be0b6b3ac6f47dbe9b/backend/settings.py#L94
5. Now run following cmds to create and run migrations.
```
python3 manage.py makemigrations
python3 manage.py migrate
```
6. Now turn on the server using
```
python3 manage.py runserver
```
Now the application is running at port 8000 by default i.e. ```http://127.0.0.1:8000```.


### Credits:
[Django with React | An Ecommerce Website](https://www.udemy.com/course/django-with-react-an-ecommerce-website/).
