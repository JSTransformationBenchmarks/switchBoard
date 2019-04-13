
      <section id="{{DEVICE_ID}}" class="{{DEVICE_TYPE}}{{DEVICE_SELECTED}}{{DEVICE_STATE}}">
        <h2>{{i18n_PS3}} <em>{{DEVICE_ACTIVE}}</em></h2>
        <div class="control-block">
          <div class="control">
            <ul>
              <li><a href="/?{{DEVICE_ID}}=PowerOn" class="fa fa-power-off power-on" title="{{i18n_POWER_ON}}"><span>{{i18n_POWER_ON}}</span></a></li>
              <li><a href="/?{{DEVICE_ID}}=PS,Sleep,Down,Down,Down,Up,Cross,Cross" class="fa fa-power-off power-off" title="{{i18n_POWER_OFF}}"><span>{{i18n_POWER_OFF}}</span></a></li>
              <li><a href="/?{{DEVICE_ID}}=Select" class="fa fa-th" title="{{i18n_SELECT}}"><span>{{i18n_SELECT}}</span></a></li>
              <li><a href="/?{{DEVICE_ID}}=Start" class="fa fa-sign-in" title="{{i18n_START}}"><span>{{i18n_START}}</span></a></li>
            </ul>
          </div>
          <div class="navigation">
            <a href="/?{{DEVICE_ID}}=Up" class="fa fa-arrow-up" title="{{i18n_UP}}"><span>{{i18n_UP}}</span></a>
            <a href="/?{{DEVICE_ID}}=Left" class="fa fa-arrow-left" title="{{i18n_LEFT}}"><span>{{i18n_LEFT}}</span></a>
            <a href="/?{{DEVICE_ID}}=Cross" class="fa-stack" title="{{i18n_CROSS}}">
              <i class="fa fa-square-o fa-stack-2x"></i>
              <i class="fa fa-level-up fa-rotate-90"></i>
              <span>{{i18n_CROSS}}</span>
            </a>
            <a href="/?{{DEVICE_ID}}=Right" class="fa fa-arrow-right" title="{{i18n_RIGHT}}"><span>{{i18n_RIGHT}}</span></a>
            <a href="/?{{DEVICE_ID}}=Down" class="fa fa-arrow-down" title="{{i18n_DOWN}}"><span>{{i18n_DOWN}}</span></a>
          </div>
          <div class="buttons">
            <ul>
              <li><a href="/?{{DEVICE_ID}}=PS" class="fa fa-cog" title="{{i18n_PS}}"><span>{{i18n_PS}}</span></a></li>
              <li><a href="/?{{DEVICE_ID}}=Triangle" class="fa fa-sitemap" title="{{i18n_TRIANGLE}}"><span>{{i18n_TRIANGLE}}</span></a></li>
              <li><a href="/?{{DEVICE_ID}}=Circle" class="fa fa-undo" title="{{i18n_CIRCLE}}"><span>{{i18n_CIRCLE}}</span></a></li>
            </ul>
          </div>
        </div>
        <div class="media">
          <ul>
            <li><a href="/?{{DEVICE_ID}}=L1" class="fa fa-step-backward" title="{{i18n_L1}}"><span>{{i18n_L1}}</span></a></li>
            <li><a href="/?{{DEVICE_ID}}=L2" class="fa fa-backward" title="{{i18n_L2}}"><span>{{i18n_L2}}</span></a></li>
            <li><a href="/?{{DEVICE_ID}}=R2" class="fa fa-forward" title="{{i18n_R2}}"><span>{{i18n_R2}}</span></a></li>
            <li><a href="/?{{DEVICE_ID}}=R1" class="fa fa-step-forward" title="{{i18n_R1}}"><span>{{i18n_R1}}</span></a></li>
          </ul>
        </div>
      </section>