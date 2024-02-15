import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path:'', component:LoginComponent
    },
    {
        path:'quiz', component:QuizComponent,
        canActivate: [authGuard]
    }
];
