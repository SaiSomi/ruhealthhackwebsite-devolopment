import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  testimonials = [
    { quote: "Hackathon was really welcoming and easy to understand as a first-time participant. Our team loved interacting with the mentors—especially Mark Zhang!", author: "~Nidhi Salian" },
    { quote: "This hackathon was a great experience!", author: "~Keerthi Peruka" },
    { quote: "Awesome experience! Met and collaborated with a lot of people from different backgrounds!", author: "~Jin Daniel" },
    { quote: "This was a great experience! I definitely learned new concepts, approaches, and ways of working with people of interdisciplinary backgrounds.", author: "~Juan Pena" },
    { quote: "I really enjoyed this Hackathon. While this wasn't the typical hackathon experience for us, I was intrigued by the ideas formulated by my teammates.", author: "~Pratham Pilli" },
    { quote: "Thanks to the organizers for arranging this Hackathon. Great Event, met great people. Overall, an enriching experience.", author: "~Reena Harjai" },
    { quote: "Excellent, will be back next year.", author: "~Alex Kent" },
    { quote: "It was really great. Loved the networking and the fun in the project. Learned a lot about other disciplines.", author: "~Shivam Kajaria" },
    { quote: "Very fun! I think the most helpful thing would be greater diversity of mentors.", author: "~Jordon Friedman" },
    { quote: "Terrific hackathon!", author: "~S Arjun" },
    { quote: "Had lots of fun, met a lot of new people, did a lot of cool things.", author: "~Srivatson Manikandan" },
    { quote: "Really enjoyed the hackathon!", author: "~Vishnu Ravi" },
    { quote: "This being my first hackathon, I had a wonderful experience and got eye-opening insight into the perspective of different disciplines.", author: "~Mehar Kanwar Sidhu" }
  ];

  currentIndex = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Listen for fragment changes
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.scrollToSection(fragment);
      }
    });
  }

  get currentTestimonials() {
    return [
      this.testimonials[this.currentIndex],
      this.testimonials[(this.currentIndex + 1) % this.testimonials.length],
      this.testimonials[(this.currentIndex + 2) % this.testimonials.length]
    ];
  }

  nextTestimonials() {
    this.currentIndex = (this.currentIndex + 3) % this.testimonials.length;
  }

  previousTestimonials() {
    this.currentIndex = (this.currentIndex - 3 + this.testimonials.length) % this.testimonials.length;
  }

  scrollToSection(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
