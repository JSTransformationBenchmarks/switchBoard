
      <section id="{{DEVICE_ID}}" class="{{DEVICE_TYPE}}{{DEVICE_SELECTED}}{{DEVICE_STATE}}">
        <h2>{{i18n_PANASONIC}} <em>{{DEVICE_ACTIVE}}</em></h2>
        <div class="control-block">
          <div class="volume">
            <a href="/?{{DEVICE_ID}}=VolUp" class="fa fa-volume-up" title="{{i18n_VOLUME_UP}}"><span>{{i18n_VOLUME_UP}}</span></a>
            <a href="/?{{DEVICE_ID}}=VolDown" class="fa fa-volume-down" title="{{i18n_VOLUME_DOWN}}"><span>{{i18n_VOLUME_DOWN}}</span></a>
            <a href="/?{{DEVICE_ID}}=Mute" class="fa fa-volume-off" title="{{i18n_MUTE}}"><span>{{i18n_MUTE}}</span></a>
          </div>
          <div class="navigation">
            <a href="/?{{DEVICE_ID}}=Up" class="fa fa-arrow-up" title="{{i18n_UP}}"><span>{{i18n_UP}}</span></a>
            <a href="/?{{DEVICE_ID}}=Left" class="fa fa-arrow-left" title="{{i18n_LEFT}}"><span>{{i18n_LEFT}}</span></a>
            <a href="/?{{DEVICE_ID}}=Enter" class="fa-stack" title="{{i18n_ENTER}}">
              <i class="fa fa-square-o fa-stack-2x"></i>
              <i class="fa fa-level-up fa-rotate-90"></i>
              <span>{{i18n_ENTER}}</span>
            </a>
            <a href="/?{{DEVICE_ID}}=Right" class="fa fa-arrow-right" title="{{i18n_RIGHT}}"><span>{{i18n_RIGHT}}</span></a>
            <a href="/?{{DEVICE_ID}}=Down" class="fa fa-arrow-down" title="{{i18n_DOWN}}"><span>{{i18n_DOWN}}</span></a>
          </div>
          <div class="channel">
            <a href="/?{{DEVICE_ID}}=Ch_Up" class="fa fa-chevron-up" title="{{i18n_CHANNEL_UP}}"><span>{{i18n_CHANNEL_UP}}</span></a>
            <a href="/?{{DEVICE_ID}}=Ch_Down" class="fa fa-chevron-down" title="{{i18n_CHANNEL_DOWN}}"><span>{{i18n_CHANNEL_DOWN}}</span></a>
          </div>
        </div>
        <div class="shortcuts">
          <ul>
            <li><a href="/?{{DEVICE_ID}}=Power" class="fa fa-power-off" title="{{i18n_POWER}}"><span>{{i18n_POWER}}</span></a></li>
            <li><a href="/?{{DEVICE_ID}}=Viera_Link" class="fa fa-th" title="{{i18n_VIERA_LINK}}"><span>{{i18n_VIERA_LINK}}</span></a></li>
            <li><a href="/?{{DEVICE_ID}}=Chg_Input" class="fa fa-desktop" title="{{i18n_CHANGE_INPUT}}"><span>{{i18n_CHANGE_INPUT}}</span></a></li>
            <li><a href="/?{{DEVICE_ID}}=Internet" class="fa fa-globe" title="{{i18n_INTERNET}}"><span>{{i18n_INTERNET}}</span></a></li>
            <li><a href="/?{{DEVICE_ID}}=HDMI4" class="fa fa-sitemap" title="{{i18n_HDMI}} 4"><span>{{i18n_HDMI}} 4</span></a></li>
            <li><a href="/?{{DEVICE_ID}}=Submenu" class="fa fa-cog" title="{{i18n_SUBMENU}}"><span>{{i18n_SUBMENU}}</span></a></li>
            <li><a href="/?{{DEVICE_ID}}=Menu" class="fa fa-list-ul" title="{{i18n_MENU}}"><span>{{i18n_MENU}}</span></a></li>
            <li><a href="/?{{DEVICE_ID}}=Cancel" class="fa fa-sign-out" title="{{i18n_CANCEL}}"><span>{{i18n_CANCEL}}</span></a></li>
          </ul>
        </div>
        <div class="text">
          <form class="text-form" action="/" method="get">
            <fieldset>
              <legend>{{i18n_TEXT_INPUT}}</legend>
              <label for="{{DEVICE_ID}}-text-input">{{i18n_TEXT_INPUT}}:</label>
              <input id="{{DEVICE_ID}}-text-input" class="text-input" type="text" name="{{DEVICE_ID}}" placeholder="{{i18n_TEXT_INPUT}}" required />
              <input class="input-type" type="hidden" value="text" name="type" />
              <button type="submit" class="button">{{i18n_SUBMIT}}</button>
            </fieldset>
          </form>
        </div>
        <div class="numeric-controls">
          <ol>
            <li><a href="/?{{DEVICE_ID}}=D1" title="1"><span>1</span></a></li>
            <li><a href="/?{{DEVICE_ID}}=D2" title="2"><span>2</span></a></li>
            <li><a href="/?{{DEVICE_ID}}=D3" title="3"><span>3</span></a></li>
            <li><a href="/?{{DEVICE_ID}}=D4" title="4"><span>4</span></a></li>
            <li><a href="/?{{DEVICE_ID}}=D5" title="5"><span>5</span></a></li>
            <li><a href="/?{{DEVICE_ID}}=D6" title="6"><span>6</span></a></li>
            <li><a href="/?{{DEVICE_ID}}=D7" title="7"><span>7</span></a></li>
            <li><a href="/?{{DEVICE_ID}}=D8" title="8"><span>8</span></a></li>
            <li><a href="/?{{DEVICE_ID}}=D9" title="9"><span>9</span></a></li>
            <li><a href="/?{{DEVICE_ID}}=D0" title="0"><span>0</span></a></li>
          </ol>
          <ul>
            <li><a href="/?{{DEVICE_ID}}=Return" class="fa fa-reply" title="{{i18n_RETURN}}"><span>{{i18n_RETURN}}</span></a></li>
            <li><a href="/?{{DEVICE_ID}}=Info" class="fa fa-list" title="{{i18n_INFO}}"><span>{{i18n_INFO}}</span></a></li>
          </ul>
        </div>
        <div class="media">
          <ul>
            <li><a href="/?{{DEVICE_ID}}=Rew" class="fa fa-backward" title="{{i18n_REWIND}}"><span>{{i18n_REWIND}}</span></a></li>
            <li><a href="/?{{DEVICE_ID}}=Sop" class="fa fa-stop" title="{{i18n_STOP}}"><span>{{i18n_STOP}}</span></a></li>
            <li><a href="/?{{DEVICE_ID}}=Pause" class="fa fa-pause" title="{{i18n_PAUSE}}"><span>{{i18n_PAUSE}}</span></a></li>
            <li><a href="/?{{DEVICE_ID}}=Play" class="fa fa-play" title="{{i18n_PLAY}}"><span>{{i18n_PLAY}}</span></a></li>
            <li><a href="/?{{DEVICE_ID}}=FF" class="fa fa-forward" title="{{i18n_FAST_FORWARD}}"><span>{{i18n_FAST_FORWARD}}</span></a></li>
            <li><a href="/?{{DEVICE_ID}}=Rec" class="fa fa-circle" title="{{i18n_RECORD}}"><span>{{i18n_RECORD}}</span></a></li>
            <li><a href="/?{{DEVICE_ID}}=Red" class="fa fa-stop red" title="{{i18n_RED}}"><span>{{i18n_RED}}</span></a></li>
            <li><a href="/?{{DEVICE_ID}}=Green" class="fa fa-stop green" title="{{i18n_GREEN}}"><span>{{i18n_GREEN}}</span></a></li>
            <li><a href="/?{{DEVICE_ID}}=Yellow" class="fa fa-stop yellow" title="{{i18n_YELLOW}}"><span>{{i18n_YELLOW}}</span></a></li>
            <li><a href="/?{{DEVICE_ID}}=Blue" class="fa fa-stop blue" title="{{i18n_BLUE}}"><span>{{i18n_BLUE}}</span></a></li>
          </ul>
        </div>
      </section>