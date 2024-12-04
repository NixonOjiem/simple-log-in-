import React from 'react'

function LeftNavigation() {
  return (
    
    <div id="nav-bar">
      <input id="nav-toggle" type="checkbox" />
      <div id="nav-header">
        <a id="nav-title" href="https://codepen.io" target="_blank">
        Q<i class="fab fa-codepen"></i>uizQuest
        </a>
        <label for="nav-toggle">
        <span id="nav-toggle-burger"></span>
        </label>
         <hr />
      </div>
      <div id="nav-content">
        <div class="nav-button">
          <i class="fas fa-palette"></i>
          <span>Anime Quize</span>
        </div>
        <div class="nav-button">
          <i class="fas fa-images"></i>
          <span>History Quiz</span>
        </div>
        <div class="nav-button">
          <i class="fas fa-thumbtack"></i>
          <span>Random Quiz</span>
       </div>
        <hr />
    <div class="nav-button">
      <i class="fas fa-heart"></i>
      <span>Quiz History</span>
    </div>
    <div class="nav-button">
      <i class="fas fa-chart-line"></i>
      <span>TBD</span>
    </div>
    <div class="nav-button">
      <i class="fas fa-fire"></i>
      <span>TBD</span>
    </div>
    <div class="nav-button">
      <i class="fas fa-magic"></i>
      <span>TBD</span>
    </div>
    <hr />
    <div class="nav-button">
      <i class="fas fa-gem"></i>
      <span>By Nixon Ojiem</span>
    </div>
    <div id="nav-content-highlight"></div>
  </div>
  <input id="nav-footer-toggle" type="checkbox" />
 
</div>
  )
}

export default LeftNavigation