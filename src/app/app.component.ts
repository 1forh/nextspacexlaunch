import { Component, OnInit } from '@angular/core';
import { SpaceXService } from './services/spacex.service';
import { format, differenceInMilliseconds } from 'date-fns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public launch;
  public date;
  public countdown;
  
  constructor(private spacexService: SpaceXService) {}

  ngOnInit() {
    this.spacexService.getUpcomingLaunces().subscribe((response) => {
      const cleanData = this.removeBadData(response);
      const sortedLaunches = this.sortLaunches(cleanData, 'launch_date_local');
      [this.launch] = sortedLaunches;
      this.date = format(this.launch.launch_date_local, 'MMMM Do, YYYY');
      
      setInterval(() => {
        this.countdown = this.getCountdown(this.launch);
      }, 1000);
    });
  }

  private getCountdown(launch) {
    const today = new Date();
    const countdown = differenceInMilliseconds(launch.launch_date_local, today);
    const formattedCountdown = this.formatCountdown(countdown);
    return formattedCountdown;
  }

  private removeBadData(launches: any[]) {
    return launches.filter((launch) => {
      return launch.launch_date_local;
    });
  }

  private sortLaunches(launches: any[], sortBy: string) {
    return launches.sort((a, b) => {
      const dateA: any = new Date(a['launch_date_local']);
      const dateB: any = new Date(b['launch_date_local']);
      return dateA - dateB;
    });
  }

  private formatCountdown(milliseconds) {
    let days, hours, minutes, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    days = Math.floor(hours / 24);
    hours = hours % 24;

    days = days.toString();
    hours = hours.toString();
    minutes = minutes.toString();
    seconds = seconds.toString();

    if (days.length === 1) {
      days = `0${days}`;
    }

    if (hours.length === 1) {
      hours = `0${hours}`;
    }

    if (minutes.length === 1) {
      minutes = `0${minutes}`;
    }

    if (seconds.length === 1) {
      seconds = `0${seconds}`;
    }

    return {
      days,
      hours,
      minutes,
      seconds
    };
  }
  
}
