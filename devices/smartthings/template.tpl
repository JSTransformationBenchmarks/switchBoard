
      <section id="{{DEVICE_ID}}" class="{{DEVICE_TYPE}}{{DEVICE_SELECTED}}{{DEVICE_STATE}}">
        <h2>{{i18n_SMARTTHINGS}} <em>{{DEVICE_ACTIVE}}</em></h2>
        <div class="installed">
          <ul class="sub-device-list">
            {{SMARTTHINGS_DYNAMIC}}
          </ul>
          <ul class="sub-device-list">
            <li><a href="/?{{DEVICE_ID}}=subdevice-mode-Home" class="fa fa-home{{DEVICE_STATE_HOME}}" title="{{i18n_HOME}}: {{i18n_HOME}}"><span>{{i18n_HOME}}</span> <em>{{HOME_STATUS}}</em></a></li>
            <li><a href="/?{{DEVICE_ID}}=subdevice-mode-Away" class="fa fa-compass{{DEVICE_STATE_AWAY}}" title="{{i18n_AWAY}}: {{AWAY_STATUS}}"><span>{{i18n_AWAY}}</span> <em>{{AWAY_STATUS}}</em></a></li>
            <li><a href="/?{{DEVICE_ID}}=subdevice-mode-Night" class="fa fa-moon-o{{DEVICE_STATE_NIGHT}}" title="{{i18n_NIGHT}}: {{NIGHT_STATUS}}"><span>{{i18n_NIGHT}}</span> <em>{{NIGHT_STATUS}}</em></a></li>
          </ul>
        </div>
      </section>