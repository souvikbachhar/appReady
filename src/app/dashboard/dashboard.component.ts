import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,AfterViewInit {
  eventText = '';
  constructor() { }

  ngOnInit() {
  }
  homeSwipe(evt){
    //console.log(evt.target.tagName);
    if (evt.target.tagName =='DIV'){
      $('#sidebar').addClass('active');
      $('.overlay').addClass('active');
    }
    if (evt.target.tagName =='IMG'){
      $('#carouselExampleIndicators').carousel('prev');
    }
  }
  ngAfterViewInit() {
    $(document).ready(function () {
      $("#sidebar").mCustomScrollbar({
          theme: "minimal"
      });

      $('#dismiss, .overlay').on('click', function () {
          $('#sidebar').removeClass('active');
          $('.overlay').removeClass('active');
      });

      $('#sidebarCollapse').on('click', function () {
          $('#sidebar').addClass('active');
          $('.overlay').addClass('active');
          $('.collapse.in').toggleClass('in');
          $('a[aria-expanded=true]').attr('aria-expanded', 'false');
      });
  });
 }

 

  onSwipe(evt) {
      const x = Math.abs(evt.deltaX) > 40 ? (evt.deltaX > 0 ? 'right' : 'left'):'';
      const y = Math.abs(evt.deltaY) > 40 ? (evt.deltaY > 0 ? 'down' : 'up') : '';

      this.eventText += `${x} ${y}<br/>`;
      $('#carouselExampleIndicators').carousel('next');
     // console.log(evt);
  }
}
