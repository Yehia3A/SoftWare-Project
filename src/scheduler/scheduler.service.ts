import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { exec } from 'child_process';

@Injectable()
export class SchedulerService {
  @Cron('0 2 * * 6') // Runs every Sunday at 2 AM
  handleCron() {
    console.log('Running weekly backup at 2 AM every Sunday');
    exec(
      'powershell.exe -File C:/Users/User/Desktop/SoftwareVerisons/SoftWare-Project-11/src/scheduler/backup.ps1',
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error during backup: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      },
    );
  }
}
