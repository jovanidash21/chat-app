import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'muicss/react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { Skeleton } from '../../../../components/Skeleton';
import './styles.scss';

class LineChartComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      title,
      data,
      xAxisKey,
      yAxisKey,
      loading,
    } = this.props;

    return (
      <Panel>
        <div className="line-chart-wrapper">
          {
            title.length > 0 &&
            <Fragment>
              {
                loading
                  ?
                  <Skeleton
                    className="line-chart-title"
                    height="21px"
                    width="100px"
                  />
                  :
                  <div className="line-chart-title">
                    {title}
                  </div>
              }
            </Fragment>
          }
          {
            loading
              ?
              <Skeleton
                className="line-chart"
                height="300px"
                width="100%"
              />
              :
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
          }
        </div>
      </Panel>
    )
  }
}

LineChartComponent.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  xAxisKey: PropTypes.string,
  yAxisKey: PropTypes.string,
  loading: PropTypes.bool,
}

LineChartComponent.defaultProps = {
  title: '',
  data: [],
  xAxisKey: '',
  yAxisKey: '',
  loading: false,
}

export default LineChartComponent;
