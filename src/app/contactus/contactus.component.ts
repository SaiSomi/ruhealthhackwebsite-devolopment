import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getFirestore, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent {
  formContactUs: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.formContactUs = this.fb.group({
      category: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.formContactUs.valid) {
      try {
        const firestore = getFirestore();
        await setDoc(doc(firestore, 'requests', this.formContactUs.value.email), {
          category: this.formContactUs.value.category,
          name: this.formContactUs.value.name,
          email: this.formContactUs.value.email,
          message: this.formContactUs.value.message,
          timestamp: new Date(),
        });

        this.submitted = true;  // Set the submitted flag to true
        this.formContactUs.reset();  // Optionally reset the form after submission

      } catch (error) {
        console.error('Error submitting request:', error);
        alert('There was an error submitting your request. Please try again later.' + error);
      }
    }
  }
}
