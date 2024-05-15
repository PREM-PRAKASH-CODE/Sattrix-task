import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  allUserList: any[] = [];
  displayStyleDeletePopup = 'none';
  displayStyleViewPopup = 'none';
  selectedUser: any;
  ngOnInit(): void {
    let userFromStrorage: any[] = [];
    let Storage: any = sessionStorage.getItem('registerData');
    if (userFromStrorage) {
      this.allUserList = JSON.parse(Storage);
    }
  }
  openDeletePopup(user: any) {
    this.selectedUser = user;
    this.displayStyleDeletePopup = 'block';
  }

  closePopup() {
    this.selectedUser = undefined;
    this.displayStyleDeletePopup = 'none';
  }
  deleteUser() {
    this.allUserList = this.allUserList.filter((user: any) => {
      if (
        user.name != this.selectedUser.name &&
        user.email != this.selectedUser.email &&
        user.phone != this.selectedUser.phone &&
        user.city != this.selectedUser.city
      ) {
        return true;
      } else {
        return false;
      }
    });
    sessionStorage.setItem('registerData', JSON.stringify(this.allUserList));
    this.closePopup();
  }
}
