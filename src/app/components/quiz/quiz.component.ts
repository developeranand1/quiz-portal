import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent {
  quizTitle = 'MCA Quiz ';
  questions: {
    text: string;
    options: string[];
    selectedOption: number;
    answer: string;
  }[] = [
    {
      text: 'What is Angular?',
      options: [
        'A programming language',
        'A JavaScript library',
        ' A framework for building client-side web applications',
        'An operating system',
      ],
      selectedOption: -1,
      answer: 'A framework for building client-side web applications',
    },
    {
      text: 'Which of the following files is used to bootstrap an Angular application?',
      options: ['app.component.ts', 'index.html', 'main.ts', 'angular.json'],
      selectedOption: -1,
      answer: 'main.ts',
    },
    {
      text: 'What is the purpose of the NgModule in Angular?',
      options: [
        'To define the structure of an Angular component',
        'To handle HTTP requests',
        'To manage dependencies and define a compilation context for a set of components',
        'To define routes for navigation',
      ],
      selectedOption: -1,
      answer:
        'To manage dependencies and define a compilation context for a set of components',
    },
    {
      text: 'What is the Angular CLI used for?',
      options: [
        'To create, manage, build, and test Angular projects',
        '  To style Angular components',
        'To write unit tests for Angular applications',
        'To deploy Angular applications',
      ],
      selectedOption: -1,
      answer: 'To create, manage, build, and test Angular projects',
    },
    {
      text: 'Which directive is used to add/remove CSS classes based on conditions in Angular templates?',
      options: ['ngClass', 'ngIf', 'ngFor', 'ngStyle'],
      selectedOption: -1,
      answer: 'ngClass',
    },
    {
      text: "What does 'ngModel' directive do in Angular?",
      options: [
        ' Renders HTML tags dynamically',
        'TBinds an input, select, textarea element to a property on the component',
        'Defines a model in Angular applications',
        'Adds event listeners to DOM elements',
      ],
      selectedOption: -1,
      answer:
        'Binds an input, select, textarea element to a property on the component',
    },
    {
      text: 'What is Angular Material?',
      options: [
        'A tool for adding animation effects to Angular applications',
        'A library that provides pre-designed UI components based on Googles Material Design',
        'An Angular feature for handling HTTP requests',
        ' A tool for optimizing Angular application performance',
      ],
      selectedOption: -1,
      answer:
        'A library that provides pre-designed UI components based on Google s Material Design',
    },
    {
      text: 'How can you pass data from a parent component to a child component in Angular?',
      options: [
        ' By using a service',
        'By using the @Input decorator',
        'By using the @Output decorator',
        ' By using the ngModel directive',
      ],
      selectedOption: -1,
      answer: ' By using the @Input decorator',
    },
    {
      text: 'Which command is used to generate a new component in Angular using the CLI?',
      options: ['ng new', 'ng generate component', 'ng serve', 'ng build'],
      selectedOption: -1,
      answer: 'ng generate component',
    },
    {
      text: 'What is Angular Ivy?',
      options: [
        'A tool for end-to-end testing of Angular applications',
        'A new rendering engine for Angular applications',
        'A tool for optimizing Angular application bundle size',
        'A component-based architecture for Angular applications',
      ],
      selectedOption: -1,
      answer: 'A new rendering engine for Angular applications',
    },
  ];

  currentQuestionIndex: number = 0;
  submitted: boolean = false;
  correctAnswers: boolean[] = [];
  totalTime: number = 0;
  timer: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.totalTime = this.questions.length * 15;
    const userData = localStorage.getItem('user');
    if (userData) {
      const { name, email } = JSON.parse(userData);
      this.name = name;
      this.email = email;
    }
    this.openFullscreen();
  }

  startTimer(): void {
    this.timer = setTimeout(() => {
      this.submitQuiz();
    }, this.totalTime * 1000);
  }

  getTimeRemaning(): string {
    const minutes = Math.floor(this.totalTime / 60);
    const seconds = this.totalTime % 60;
    return `${minutes} minutes ${seconds} seconds`;
  }

  selectOption(optionIndex: number) {
    clearTimeout(this.timer);
    this.questions[this.currentQuestionIndex].selectedOption = optionIndex;
    this.startTimer();
  }

  submitQuiz() {
    clearTimeout(this.timer);
    this.submitted = true;
    this.correctAnswers = this.questions.map(
      (q) => q.options[q.selectedOption] === q.answer
    );
  }

  getScore(): number {
    return this.correctAnswers.filter((a) => a).length;
  }

  goToNextQuestion() {
    this.openFullscreen();
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  goToPrevQuestion() {
    this.openFullscreen();
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  getLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  name: string | null = '';
  email: string | null = '';

  logout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('');
  }

  openFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  }
}
