import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/model/employee';
import { ProfileAllEmployees } from '../services/employeeService.service';

@Component({
  selector: 'app-image-edit-form',
  templateUrl: './image-edit-form.component.html',
  styleUrls: ['./image-edit-form.component.css']
})
export class ImageEditFormComponent {
  imageUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(
    private imageService: ProfileAllEmployees,
    public dialogRef: MatDialogRef<ImageEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee }
  ) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => (this.imageUrl = e.target.result);
      reader.readAsDataURL(file);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.imageService.uploadImage(this.data.employee.employeeId, this.selectedFile).subscribe(
        (response) => {
          this.dialogRef.close();
        },
        (error) => {
          console.error('Upload failed:', error);
        }
      );
    }
  }
  
}
