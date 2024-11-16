import { 
    BanknotesIcon, 
    EllipsisHorizontalIcon 
} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import Dropdown from '@/components/ui/Dropdown';
import { useTheme } from '@/context/ThemeContext';
import IconCode from '@/components/Icon/IconCode';

const TicketPreview = () => {
    const { theme, rtlClass, isDarkMode, setPageTitle } = useTheme();

    useEffect(() => {
        setPageTitle('Analytics Admin');
    });

    const isDark = theme === 'dark' || isDarkMode;
    const isRtl = rtlClass === 'rtl' ? true : false;

    // uniqueVisitorSeriesOptions
    const uniqueVisitorSeries: any = {
        series: [
            {
                name: 'New',
                data: [58, 44, 55, 57, 56, 61, 58, 63, 60, 66, 56, 63],
            },
            {
                name: 'Solved',
                data: [91, 76, 85, 101, 98, 87, 105, 91, 114, 94, 66, 70],
            },
        ],
        options: {
            chart: {
                height: 360,
                type: 'bar',
                fontFamily: 'Nunito, sans-serif',
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 2,
                colors: ['transparent'],
            },
            colors: ['#5c1ac3', '#ffbb44'],
            dropShadow: {
                enabled: true,
                blur: 3,
                color: '#515365',
                opacity: 0.4,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    borderRadius: 8,
                    borderRadiusApplication: 'end',
                },
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                itemMargin: {
                    horizontal: 8,
                    vertical: 8,
                },
            },
            grid: {
                borderColor: isDark ? '#191e3a' : '#e0e6ed',
                padding: {
                    left: 20,
                    right: 20,
                },
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                axisBorder: {
                    show: true,
                    color: isDark ? '#3b3f5c' : '#e0e6ed',
                },
            },
            yaxis: {
                tickAmount: 6,
                opposite: isRtl ? true : false,
                labels: {
                    offsetX: isRtl ? -10 : 0,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: isDark ? 'dark' : 'light',
                    type: 'vertical',
                    shadeIntensity: 0.3,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 0.8,
                    stops: [0, 100],
                },
            },
            tooltip: {
                marker: {
                    show: true,
                },
            },
        },
    };

    // pieChartOptions
    const pieChart: any = {
        series: [44, 55, 13, 43, 22],
        options: {
            chart: {
                height: 300,
                type: 'pie',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
            colors: ['#4361ee', '#805dca', '#00ab55', '#e7515a', '#e2a03f'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                    },
                },
            ],
            stroke: {
                show: false,
            },
            legend: {
                position: 'bottom',
            },
        },
    };
    
    // barChartOptions
    const barChart: any = {
        series: [
            {
                name: 'Sales',
                data: [44, 55, 41, 67, 22, 43, 21, 70],
            },
        ],
        options: {
            chart: {
                height: 300,
                type: 'bar',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 1,
            },
            colors: ['#4361ee'],
            xaxis: {
                categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
                axisBorder: {
                    color: isDark ? '#191e3a' : '#e0e6ed',
                },
            },
            yaxis: {
                opposite: isRtl ? true : false,
                reversed: isRtl ? true : false,
            },
            grid: {
                borderColor: isDark ? '#191e3a' : '#e0e6ed',
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                },
            },
            fill: {
                opacity: 0.8,
            },
        },
    };
    return (
        <Fragment>
            <ul className="flex space-x-2 rtl:space-x-reverse mb-6">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Support Tickets
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Preview</span>
                </li>
            </ul>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
                <div className="rounded-lg panel h-full p-0">
                    <div className="flex p-5">
                        <div className="shrink-0 bg-primary/10 text-primary rounded-xl w-11 h-11 flex justify-center items-center dark:bg-primary dark:text-white-light">
                            <BanknotesIcon className="w-5 h-5" />
                        </div>
                        <div className="ltr:ml-3 rtl:mr-3 font-semibold">
                            <h5 className="text-[#506690] text-xs">Total Number of Tickets</h5>
                            <p className="text-xl dark:text-white-light">31.6K</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg panel h-full p-0">
                    <div className="flex p-5">
                        <div className="shrink-0 bg-danger/10 text-danger rounded-xl w-11 h-11 flex justify-center items-center dark:bg-danger dark:text-white-light">
                            <BanknotesIcon className="w-5 h-5" />
                        </div>
                        <div className="ltr:ml-3 rtl:mr-3 font-semibold">
                            <h5 className="text-[#506690] text-xs">Unassigned Tickets</h5>
                            <p className="text-xl dark:text-white-light">1,900</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg panel h-full p-0">
                    <div className="flex p-5">
                        <div className="shrink-0 bg-success/10 text-success rounded-xl w-11 h-11 flex justify-center items-center dark:bg-success dark:text-white-light">
                            <BanknotesIcon className="w-5 h-5" />
                        </div>
                        <div className="ltr:ml-3 rtl:mr-3 font-semibold">
                            <h5 className="text-[#506690] text-xs">Open Tickets</h5>
                            <p className="text-xl dark:text-white-light">18.2%</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg panel h-full p-0">
                    <div className="flex p-5">
                        <div className="shrink-0 bg-success/10 text-info rounded-xl w-11 h-11 flex justify-center items-center dark:bg-info dark:text-white-light">
                            <BanknotesIcon className="w-5 h-5" />
                        </div>
                        <div className="ltr:ml-3 rtl:mr-3 font-semibold">
                            <h5 className="text-[#506690] text-xs">Solved Tickets</h5>
                            <p className="text-xl dark:text-white-light">18.2%</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-8">
                <div className="panel h-full p-0 lg:col-span-2">
                    <div className="flex items-start justify-between dark:text-white-light mb-5 p-5 border-b  border-white-light dark:border-[#1b2e4b]">
                        <h5 className="font-semibold text-lg">Daily Ticket Activity</h5>
                        <div className="dropdown">
                            <Dropdown
                                offset={[0, 5]}
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="hover:text-primary"
                                button={<EllipsisHorizontalIcon className="text-black/70 dark:text-white/70 hover:!text-primary w-5 h-5" />}
                            >
                                <ul>
                                    <li>
                                        <button type="button">Daily</button>
                                    </li>
                                    <li>
                                        <button type="button">Monthly</button>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                    <ReactApexChart options={uniqueVisitorSeries.options} series={uniqueVisitorSeries.series} type="bar" height={360} className="overflow-hidden" />
                </div>
                <div className="grid xl:grid-cols-3 gap-6 mb-6">
                    <div className="panel h-full xl:col-span-2">
                        <div className="mb-5 flex items-center justify-between">
                            <h5 className="text-lg font-semibold dark:text-white">Types of Problems</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => {}}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <ReactApexChart series={barChart.series} options={barChart.options} className="rounded-lg bg-white dark:bg-black overflow-hidden" type="bar" height={300} />
                        </div>
                    </div>
                    <div className="panel h-full">
                        <div className="mb-5 flex items-center justify-between">
                            <h5 className="text-lg font-semibold dark:text-white">Tickets by Customer Type</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => {}}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <ReactApexChart series={pieChart.series} options={pieChart.options} className="rounded-lg bg-white dark:bg-black overflow-hidden" type="pie" height={300} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default TicketPreview;
