import { FormControl } from '@angular/forms';

export interface BookAddForm {
  title: FormControl<string | null>;
}
