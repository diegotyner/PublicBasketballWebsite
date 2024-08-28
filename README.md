<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Taken from https://github.com/othneildrew/Best-README-Template/blob/main/BLANK_README.md. Great guide!
-->


[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/diegotyner/PublicBasketballWebsite">
    <img src="reactfolder/public/assets/Ball_Favicon.png" alt="Logo" width="50" height="50">
  </a>

<h3 align="center">Basketball Video Website</h3>

  <p align="center">
    My first react project, a bit boring
    <br />
    <a href="https://public-basketball-website.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/diegotyner/PublicBasketballWebsite/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/diegotyner/PublicBasketballWebsite/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

I put initialy put together this project to learn react and to create a website of my basketball clips with searching and filtering. I didn't like the idea of making those public, so instead I redid the website with the 2022 playoffs (Dub Nation up). Demo is available, not too impressive or pretty but hey, its up!

The project is a Vite/React frontend, back by a simple Express/Node backend.

If you're interested in this, its pretty easy to put together your own based off this, check the installation!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![Vite][Vite]][Vite-url]
* [![React][React.js]][React-url]
* [![Express][Express]][Express-url]
* [![Tailwind][Tailwind-css]][Tailwind-url]
* [![Mongo][Mongo]][Mongo-url]
* [![Radix][Radixui]][Radixui-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage

### Features: 

* CRUD operations on videos in the website.
* Quickly navigating through a fun view of a bunch of Youtube videos.
* Searching for text matches in the title or the description (input text in search bar)
* Filtering through tags in the videos (tag icon next to search bar)
* Sorting by date (click the publish date)
* Useful one-time functions in the api for configuring batches of videos


<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- GETTING STARTED -->
## Getting Started

To get this to work locally...

### Installation

1. Download all of the dependencies listed in the package.json

2. Obtain the following API key:
    * A MongoDB SRV connection string

3. Get the data necessary for the website. I would recommend using my Youtube Playlist JSON creator tool. 
    * To <a href="https://public-basketball-website.vercel.app/">create JSON</a> with my app, you need to navigate to create, add a google account, and then you can download JSON data for an entire youtube playlist at once. I've created a route in the backend API to push this into MongoDB all at once. 

4. Set your own tags. I've also created an API route for quickly reassigning all tags. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Feel free to shoot me an email! I'd love any and all feedback - diego.tyner@gmail.com

Project Link: [https://public-basketball-website.vercel.app/](https://public-basketball-website.vercel.app/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/diego-tyner
[Vite]: https://img.shields.io/badge/vite-b33dfe?style=for-the-badge&logo=vite&logoColor=ffcc24
[Vite-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Tailwind-css]: https://img.shields.io/badge/TAILWIND%20CSS-0b2034?style=for-the-badge&logo=tailwindcss&logoColor=61DAFB
[Tailwind-url]: https://tailwindcss.com
[Mongo]: https://img.shields.io/badge/mongodb-001e2b?style=for-the-badge&logo=mongodb&logoColor=00ed64
[Mongo-url]: https://mongodb.com
[Express]: https://img.shields.io/badge/express-010409?style=for-the-badge&logo=express&logoColor=e6edf3
[Express-url]: https://expressjs.com
[Radixui]: https://img.shields.io/badge/radix%20ui-322637?style=for-the-badge&logo=radixui&logoColor=#edeef0
[Radixui-url]: https://www.radix-ui.com/
