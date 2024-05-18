import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrl: './servers.component.css',
})
export class ServersComponent {
  servers = ['Test 1', 'Test 2', 'Test 3'];
  allowNewServer = true;
  serverCreated = false;
  serverName = '';
  serverCreationStatus = 'No server was created!';

  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = this.serverName + ' was Created!';
    setTimeout(() => {
      this.serverName = "";
      this.serverCreated = false;
    }, 3500);
  }

  // onUpdateServerName(event: any) {
  //   this.serverName = event.target.value;
  // }
}
