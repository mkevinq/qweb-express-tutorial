import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component'
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {


  selectedTerm = 'Focus';
  selectedTermDesc = 'Trying to focus on more than one thing at a time reduces your productivity by as much as 40%. That’s the cognitive equivalent of pulling an all-nighter. ';
  selectedLink = 'https://blog.doist.com/focus-work/';
  constructor() { }

  setSelectedTerm(e){
    this.selectedTerm = e;

    switch(e){
      case 'Focus':
        this.selectedTermDesc = 'Trying to focus on more than one thing at a time reduces your productivity by as much as 40%. That’s the cognitive equivalent of pulling an all-nighter. ';
        this.selectedLink = 'https://blog.doist.com/focus-work/'
        break;
      case 'Adapt':
        this.selectedTermDesc = 'Having adaptability skills means you are open and willing to learn new things, take on new challenges and make adjustments to suit transitions in the workplace. ';
        this.selectedLink = 'https://www.indeed.com/career-advice/career-development/adaptability-skills'

        break;
      case 'Support':
        this.selectedTermDesc = 'A leadership style that supports an employee until a task’s completion';
        this.selectedLink = 'https://corporatefinanceinstitute.com/resources/careers/soft-skills/supportive-leadership/'
        break;
      case 'Apprieciate':
        this.selectedTermDesc = 'Trying to focus on more than one thing at a time reduces your productivity by as much as 40%. That’s the cognitive equivalent of pulling an all-nighter. ';
        this.selectedLink = 'https://blog.doist.com/focus-work/'
        break;
      case 'Communicate':
        this.selectedTermDesc = 'Trying to focus on more than one thing at a time reduces your productivity by as much as 40%. That’s the cognitive equivalent of pulling an all-nighter. ';
        this.selectedLink = 'https://blog.doist.com/focus-work/'
        break;
      case 'Learn':
        this.selectedTermDesc = 'Trying to focus on more than one thing at a time reduces your productivity by as much as 40%. That’s the cognitive equivalent of pulling an all-nighter. ';
        this.selectedLink = 'https://blog.doist.com/focus-work/'
        break;
      case 'Lead':
        this.selectedTermDesc = 'Trying to focus on more than one thing at a time reduces your productivity by as much as 40%. That’s the cognitive equivalent of pulling an all-nighter. ';
        this.selectedLink = 'https://blog.doist.com/focus-work/'
        break;
    }

  }
  ngOnInit(): void {
  }

}
