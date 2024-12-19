import { Divider} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
    bg_blue_600,
    bg_grey_500,
    success_500
} from "../common/constant.ts";
import ArrowDownwardTwoToneIcon from '@mui/icons-material/ArrowDownwardTwoTone';
import ArrowUpwardTwoToneIcon from '@mui/icons-material/ArrowUpwardTwoTone';
import MovingIcon from '@mui/icons-material/Moving';
import DescriptionIcon from '@mui/icons-material/Description';
import {ResultSaleTodayDTO} from "../dtos/ResultSaleTodayDTO.ts";
import {useEffect, useState} from "react";
import {StatisticService} from "../services/StatisticService.ts";


const CardDashboardResultToday = () => {
    const [data, setData] = useState<ResultSaleTodayDTO>(new ResultSaleTodayDTO(0, 0, 0, 0, 0, 0, 0, 0, 0));

    useEffect(() => {
        fetchResultSaleToday();
    }, []);

    const fetchResultSaleToday = async () => {
        try {
            const response = await StatisticService.getResultSaleToday();
            setData(response);
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
      <div className={'flex flex-col'} style={{height: "100%"}}>
          <span style={{fontSize: "1rem", fontWeight: "bold"}}>KẾT QUẢ BÁN HÀNG HÔM NAY</span>
          <div
              className={'flex flex-row flex-1 items-center pt-2'}
          >
              <div className={'flex flex-row flex-1 items-center'}>
                  <div
                      className={'flex flex-row items-center justify-center'}
                      style={{height: 36, width: 36, borderRadius: 36, backgroundColor: bg_blue_600}}
                  >
                      <AttachMoneyIcon fontSize="medium" fontWeight='bold' sx={{color: 'white'}}/>
                  </div>
                  <div className={'flex-1 flex flex-col pl-4'}>
                      <span style={{fontSize: "0.9rem", fontWeight: "bold" , color: bg_grey_500}}>Doanh số</span>
                      <div className={'flex flex-row items-center'}>
                          <div style={{fontSize: "1.3rem", color: bg_blue_600}}>{data.totalRevenueToday.toLocaleString()}</div>
                          {(data.percentRevenueChange > 0) ?
                              <ArrowUpwardTwoToneIcon fontSize="small" sx={{color: success_500, marginLeft: 2}}/>:
                              <ArrowDownwardTwoToneIcon fontSize="small" sx={{color: 'red', marginLeft: 2}}/>
                          }
                          <div style={{fontSize: "0.9rem", color: bg_grey_500}}>{Math.abs(data.percentRevenueChange)}%</div>
                      </div>
                      <span style={{fontSize: "0.9rem", color: bg_grey_500}}>Hôm qua: {data.totalRevenueYesterday.toLocaleString()}</span>
                  </div>
              </div>

              <Divider
                  orientation="vertical"
                  flexItem
                  sx={{margin: '0 16px' }}
              />

              <div className={'flex flex-row flex-1 items-center'}>
                  <div
                      className={'flex flex-row items-center justify-center'}
                      style={{height: 36, width: 36, borderRadius: 36, backgroundColor: success_500}}
                  >
                      <MovingIcon fontSize="medium" fontWeight='bold' sx={{color: 'white'}}/>
                  </div>
                  <div className={'flex-1 flex flex-col pl-4'}>
                      <span style={{fontSize: "0.9rem", fontWeight: "bold", color: bg_grey_500}}>Lợi nhuận</span>
                      <div className={'flex flex-row items-center'}>
                          <div style={{fontSize: "1.3rem", color: success_500}}>{data.totalProfitToday.toLocaleString()}</div>
                          {(data.percentRevenueChange > 0) ?
                              <ArrowUpwardTwoToneIcon fontSize="small" sx={{color: success_500, marginLeft: 2}}/>:
                              <ArrowDownwardTwoToneIcon fontSize="small" sx={{color: 'red', marginLeft: 2}}/>
                          }
                          <div style={{fontSize: "0.9rem", color: bg_grey_500}}>{Math.abs(data.percentProfitChange)}%</div>
                      </div>
                      <span style={{fontSize: "0.9rem", color: bg_grey_500}}>Hôm qua: {data.totalProfitYesterday.toLocaleString()}</span>
                  </div>
              </div>

              <Divider
                  orientation="vertical"
                  flexItem
                  sx={{margin: '0 16px'}}
              />

              <div className={'flex flex-row flex-1 items-center'}>
                  <div
                      className={'flex flex-row items-center justify-center'}
                      style={{height: 36, width: 36, borderRadius: 36, backgroundColor: 'orange'}}
                  >
                      <DescriptionIcon fontSize="small" fontWeight='bold' sx={{color: 'white'}}/>
                  </div>
                  <div className={'flex-1 flex flex-col pl-4'}>
                      <span style={{fontSize: "0.9rem", fontWeight: "bold", color: bg_grey_500}}>Hóa đơn</span>
                      <div className={'flex flex-row items-center'}>
                          <div style={{fontSize: "1.3rem", color: 'orange'}}>{data.totalOrdersToday}</div>
                          {(data.percentRevenueChange > 0) ?
                              <ArrowUpwardTwoToneIcon fontSize="small" sx={{color: success_500, marginLeft: 2}}/>:
                              <ArrowDownwardTwoToneIcon fontSize="small" sx={{color: 'red', marginLeft: 2}}/>
                          }
                          <div style={{fontSize: "0.9rem", color: bg_grey_500}}>{Math.abs(data.percentOrdersChange)}%</div>
                      </div>
                      <span style={{fontSize: "0.9rem", color: bg_grey_500}}>Hôm qua: {data.totalOrdersYesterday.toLocaleString()}</span>
                  </div>
              </div>
          </div>
      </div>
    );
}

export default CardDashboardResultToday;