function revealToSpan() {
    document.querySelectorAll(".reveal")
        .forEach(function (elem) {
            // creat two span
            var parent = document.createElement("span");
            var child = document.createElement("span");

            // parent and child both sets their respactive classes
            parent.classList.add("parent");
            child.classList.add("child");


            // span parent gets child and child gets details
            child.innerHTML = elem.innerHTML
            parent.appendChild(child);

            // elem replaces its value with parent span
            elem.innerHTML = "";
            elem.appendChild(parent);

        })
}

function ValueSatters() {
    gsap.set("#nav ul li", { y: "-100%", opacity: 0 });
    gsap.set("#home span .child", { y: "100%" });
    gsap.set(".home-page-left-text", { opacity: 0, y: "100" });
}


function loaderAnimation() {
    var tl = gsap.timeline();

    tl
        .from("#loader .child span", {
            x: 100,
            duration: 1.4,
            stagger: .2,
            ease: Power3.easeInOut
        })
        .to("#loader .parent .child", {
            y: "-100%",
            duration: 1,
            ease: Circ.easeInOut
        })

        .to("#loader", {
            height: 0,
            duration: 1,
            ease: Circ.ease
        })

        .to("#green", {
            height: "100vh",
            top: 0,
            duration: 2,
            delay: -2,
            ease: Circ.easeOut
        })

        .to("#green", {
            height: 0,
            top: 0,
            duration: 1,
            delay: -.5,
            ease: Circ.ease,
            onComplete: function () {
                animateHomepage();
            }
        })
}


function animateHomepage() {

    gsap.to(".about-home", {
        height: "60vh",
        ease: Expo.ease,
        duration: 2
    })

    var tl = gsap.timeline();

    tl.to("#nav ul li", {
        y: 0,
        opacity: 1,
        stagger: .05,
        ease: Expo.easeInOut
    })

    tl.to("#home .parent .child", {
        y: 0,
        stagger: .1,
        duration: 1.5,
        ease: Expo.easeInOut
    })

    tl.to(".home-page-left-text", {
        opacity: 1,
        duration: 1,
        y: "0",
        delay: -2.5,
        ease: Expo.ease
    })



}

function locoInitialize() {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('#main'),
        smooth: true
    });
}

function AnimateTesimonial() {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        }
    });
}

function Timer() {

    // Set the date we're counting down to
    var countDownDate = new Date("March 5, 2023 15:37:25").getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="timer"
        document.getElementById("timer").innerHTML = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";

        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = "EXPIRED";
        }
    }, 1000);
}

function gsapAnimation() {

    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });


    gsap.from(".card-second", {
        scrollTrigger: {
            trigger: "#our-team",
            start: "top 40%",
            scroller: "#main",
            // markers: true
        },
        y: "-200",
        duration: .8,
        stagger: .2,
        opacity: 0,
        // markers: true,
        ease: Expo.ease
    })





    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

function Navigation() {
    var menu = document.querySelector("#nav-menu");
    var line1 = document.querySelector("#nav-menu-line1");
    var line2 = document.querySelector("#nav-menu-line2");
    var nav = document.querySelector("#nav");
    var nav2 = document.querySelector("#nav2");
    var flag = 0;

    menu.addEventListener("click", function () {
        if (flag === 0) {
            line1.style.position = "absolute"
            line1.style.transform = "rotate(45deg)"
            line2.style.positon = "absolute"
            line2.style.transform = "rotate(-45deg)"
            nav.style.height = "80vh"
            flag = 1
        }
        else {
            line1.style.transform = "rotate(0deg)"
            line1.style.position = "initial"
            line2.style.transform = "rotate(0deg)"
            line2.style.positon = "absolute"
            nav.style.height = "0vh"
            flag = 0
        }
    })
}

locoInitialize();
revealToSpan();
ValueSatters();
loaderAnimation();
AnimateTesimonial();
Timer();
gsapAnimation();
Navigation();