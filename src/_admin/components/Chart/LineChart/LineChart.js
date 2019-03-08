import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'muicss/react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { LoadingAnimation } from '../../../../components/LoadingAnimation';
import './styles.scss';

class LineChartComponent extends Component {
  constructor(props) {
    super(props);
  }
  handleLineChartRender() {
    const {
      title,
      data,
      xAxisKey,
      yAxisKey,
      loading
    } = this.props;

    if ( !loading ) {
      return (
        <div className="line-chart-wrapper">
          {
            title.length > 0 &&
            <div className="line-chart-title">
              {title}
            </div>
          }
          <div className="line-chart">
            <ResponsiveContainer>
              <LineChart data={data}>
                <Line type="monotone" dataKey={yAxisKey} stroke="#26a69a" strokeWidth={4} />
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" tick={{fill: '#000'}} />
                <XAxis dataKey={xAxisKey} />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )
    } else {
      return (
        <LoadingAnimation name="ball-clip-rotate" color="black" />
      )
    }
  }
  render() {
    return (
      <Panel>
        {::this.handleLineChartRender()}
      </Panel>
    )
  }
}

LineChartComponent.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  xAxisKey: PropTypes.string,
  yAxisKey: PropTypes.string,
  loading: PropTypes.bool
}

LineChartComponent.defaultProps = {
  title: '',
  data: [],
  xAxisKey: '',
  yAxisKey: '',
  loading: false
}

export default LineChartComponent;
