const timeline = () => {
	class VerticalTimeline {
		constructor(element) {
			this.element = element;
			this.blocks = this.element.getElementsByClassName("cd-timeline__block");
			this.images = this.element.getElementsByClassName("cd-timeline__img");
			this.contents = this.element.getElementsByClassName("cd-timeline__content");
			this.offset = 0.8;
			this.hideBlocks();
		}
		hideBlocks() {
			if (!"classList" in document.documentElement) {
				return;
			}
			var self = this;
			for (var i = 0; i < this.blocks.length; i++) {
				(function (i) {
					if (self.blocks[i].getBoundingClientRect().top >
						window.innerHeight * self.offset) {
						self.images[i].classList.add("cd-timeline__img--hidden");
						self.contents[i].classList.add("cd-timeline__content--hidden");
					}
				})(i);
			}
		}
		showBlocks() {
			if (!"classList" in document.documentElement) {
				return;
			}
			var self = this;
			for (var i = 0; i < this.blocks.length; i++) {
				(function (i) {
					if (self.contents[i].classList.contains("cd-timeline__content--hidden") &&
						self.blocks[i].getBoundingClientRect().top <=
						window.innerHeight * self.offset) {
						self.images[i].classList.add("cd-timeline__img--bounce-in");
						self.contents[i].classList.add("cd-timeline__content--bounce-in");
						self.images[i].classList.remove("cd-timeline__img--hidden");
						self.contents[i].classList.remove("cd-timeline__content--hidden");
					}
				})(i);
			}
		}
	}

	var verticalTimelines = document.getElementsByClassName("js-cd-timeline"),
		verticalTimelinesArray = [],
		scrolling = false;
	if (verticalTimelines.length > 0) {
		for (var i = 0; i < verticalTimelines.length; i++) {
			(function (i) {
				verticalTimelinesArray.push(new VerticalTimeline(verticalTimelines[i]));
			})(i);
		}

		window.addEventListener("scroll", function (event) {
			if (!scrolling) {
				scrolling = true;
				!window.requestAnimationFrame
					? setTimeout(checkTimelineScroll, 250)
					: window.requestAnimationFrame(checkTimelineScroll);
			}
		});
	}

	function checkTimelineScroll() {
		verticalTimelinesArray.forEach(function (timeline) {
			timeline.showBlocks();
		});
		scrolling = false;
	}
};

const navSlide = () => {
	const burger = document.querySelector('.burger');
	const nav = document.querySelector('.navbar');
	const navLinks = document.querySelectorAll('.navbar li');
	burger.addEventListener('click', () => {
		nav.classList.toggle('nav-active');
		burger.classList.toggle('toggle');
		navLinks.forEach((link, index) => {
			if (link.style.animation) {
				link.style.animation = '';
			} else {
				link.style.animation = `navLinkFade 0.5s ease forwards ${index / 5 + 0.5}s`;
			}
		});
	});
	// burger.addEventListener('hoverover', () => {
	// 	burger.classList.toggle('toggle2');
	// });
}

const openContent = (evt, content) => {
  var i, coursework, tablinks;
  coursework = document.getElementsByClassName("coursework");
  for (i = 0; i < coursework.length; i++) {
    coursework[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(content).style.display = "block";
  evt.currentTarget.className += " active";
}

const main = () => {
	timeline();
	navSlide();
	document.getElementById("defaultOpen").click();
}
main();