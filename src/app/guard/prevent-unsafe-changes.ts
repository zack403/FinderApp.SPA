import { CanDeactivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { MemberEditComponent } from "../components/member-edit/member-edit.component";

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {

    canDeactivate(component : MemberEditComponent){
        if(component.editForm.dirty){
            return confirm("Are you sure you want to continue? Any unsaved changes will be lost");
        }
        return true;

    }
}