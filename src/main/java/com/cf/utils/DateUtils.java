package com.cf.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

/**
 * 日期处理
 * 
 */
public class DateUtils {
	/** 时间格式(yyyy-MM-dd) */
	public final static String DATE_PATTERN = "yyyy-MM-dd";
	/** 时间格式(yyyy-MM-dd HH:mm:ss) */
	public final static String DATE_TIME_PATTERN = "yyyy-MM-dd HH:mm:ss";

	public static String format(Date date) {
		return format(date, DATE_PATTERN);
	}

	public static String format(Date date, String pattern) {
		if (date != null) {
			SimpleDateFormat df = new SimpleDateFormat(pattern);
			return df.format(date);
		}
		return null;
	}

	// ====自定义==========================================================================//
	private final static SimpleDateFormat sdfYear = new SimpleDateFormat("yyyy");
	private final static SimpleDateFormat sdfDay = new SimpleDateFormat("yyyy-MM-dd");
	private final static SimpleDateFormat sdfDays = new SimpleDateFormat("yyyyMMdd");
	private final static SimpleDateFormat sdfTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	public static Date getDatestart() throws Exception {
		String date = sdfDay.format(new Date());
		String datetime = date + " 00:00:00";
		return sdfTime.parse(datetime);
	}

	public static Date getDateend() throws Exception {
		String date = sdfDay.format(new Date());
		String datetime = date + " 23:59:59";
		return sdfTime.parse(datetime);
	}

	/**
	 * 获取YYYY格式
	 * 
	 * @return
	 */
	public static String getYear() {
		return sdfYear.format(new Date());
	}

	/**
	 * 获取YYYY-MM-DD格式
	 * 
	 * @return
	 */
	public static String getDay() {
		return sdfDay.format(new Date());
	}

	public static String getDay(Date date) {
		return sdfDay.format(date);
	}

	/**
	 * 获取YYYYMMDD格式
	 * 
	 * @return
	 */
	public static String getDays() {
		return sdfDays.format(new Date());
	}

	public static Date getDays1() throws Exception {
		return sdfDays.parse(sdfDays.format(new Date()));
	};

	/**
	 * 获取YYYY-MM-DD HH:mm:ss格式
	 * 
	 * @return
	 */
	public static String getTime() {
		return sdfTime.format(new Date());
	}

	public static String getTime(String sdate) {
		try {
			Date d = sdfTime.parse(sdate);
			long time = (new Date().getTime() - d.getTime()) / 1000;

			StringBuffer sb = new StringBuffer();
			if (time > 0 && time < 60) { // 1小时内
				return sb.append("刚刚").toString();
			} else if (time > 60 && time < 3600) {
				return sb.append(time / 60 + "分钟前").toString();
			} else if (time >= 3600 && time < 3600 * 24) {
				return sb.append(time / 3600 + "小时前").toString();
			} else if (time >= 3600 * 24 && time < 3600 * 48) {
				return sb.append("昨天").toString();
			} else if (time >= 3600 * 48 && time < 3600 * 72) {
				return sb.append("前天").toString();
			} else if (time >= 3600 * 72) {
				return sdate;
			} else {
				return sdate;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sdate;
	}

	public static String getTimecomment(String sdate) {
		try {
			Date d = sdfTime.parse(sdate);
			long time = (new Date().getTime() - d.getTime()) / 1000;

			StringBuffer sb = new StringBuffer();
			if (time > 0 && time < 60) { // 1小时内
				return sb.append("刚刚").toString();
			} else if (time > 60 && time < 3600) {
				return sb.append(time / 60 + "分钟前").toString();
			} else if (time >= 3600 && time < 3600 * 24) {
				return sb.append(time / 3600 + "小时前").toString();
			} else if (time >= 3600 * 24 && time < 3600 * 48) {
				return sb.append("昨天").toString();
			} else if (time >= 3600 * 48 && time < 3600 * 72) {
				return sb.append("前天").toString();
			} else if (time >= 3600 * 72) {
				return sdate;
			} else {
				return sdate;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sdate;
	}

	/**
	 * 获取YYYY-MM-DD HH:mm:ss Date
	 *
	 * @return
	 */
	public static Date getNowDate() throws Exception {
		return sdfTime.parse(sdfTime.format(new Date()));
	}

	/**
	 * @Title: compareDate
	 * @Description: TODO(日期比较，如果s>=e 返回true 否则返回false)
	 * @param s
	 * @param e
	 * @return boolean
	 * @throws @author
	 *             luguosui
	 */
	public static boolean compareDate(String s, String e) {
		if (fomatDate(s) == null || fomatDate(e) == null) {
			return false;
		}
		return fomatDate(s).getTime() >= fomatDate(e).getTime();
	}

	/**
	 * 格式化日期
	 * 
	 * @return
	 */
	public static Date fomatDate(String date) {
		DateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
		try {
			return fmt.parse(date);
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * 校验日期是否合法
	 * 
	 * @return
	 */
	public static boolean isValidDate(String s) {
		DateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
		try {
			fmt.parse(s);
			return true;
		} catch (Exception e) {
			// 如果throw java.text.ParseException或者NullPointerException，就说明格式不对
			return false;
		}
	}

	public static int getDiffYear(String startTime, String endTime) {
		DateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
		try {
			long aa = 0;
			int years = (int) (((fmt.parse(endTime).getTime() - fmt.parse(startTime).getTime()) / (1000 * 60 * 60 * 24))
					/ 365);
			return years;
		} catch (Exception e) {
			// 如果throw java.text.ParseException或者NullPointerException，就说明格式不对
			return 0;
		}
	}

	/**
	 * <li>功能描述：时间相减得到天数
	 * 
	 * @param beginDateStr
	 * @param endDateStr
	 * @return long
	 * @author Administrator
	 */
	public static long getDaySub(String beginDateStr, String endDateStr) {
		long day = 0;
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Date beginDate = null;
		Date endDate = null;

		try {
			beginDate = format.parse(beginDateStr);
			endDate = format.parse(endDateStr);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		day = (endDate.getTime() - beginDate.getTime()) / (24 * 60 * 60 * 1000);
		// System.out.println("相隔的天数="+day);

		return day;
	}

	/**
	 * 得到n天之后的日期
	 * 
	 * @param days
	 * @return
	 */
	public static String getAfterDayDate(String days) {
		int daysInt = Integer.parseInt(days);

		Calendar canlendar = Calendar.getInstance(); // java.util包
		canlendar.add(Calendar.DATE, daysInt); // 日期减 如果不够减会将月变动
		Date date = canlendar.getTime();

		SimpleDateFormat sdfd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String dateStr = sdfd.format(date);

		return dateStr;
	}

	/**
	 * 得到n天之后是周几
	 * 
	 * @param days
	 * @return
	 */
	public static String getAfterDayWeek(String days) {
		int daysInt = Integer.parseInt(days);

		Calendar canlendar = Calendar.getInstance(); // java.util包
		canlendar.add(Calendar.DATE, daysInt); // 日期减 如果不够减会将月变动
		Date date = canlendar.getTime();

		SimpleDateFormat sdf = new SimpleDateFormat("E");
		String dateStr = sdf.format(date);

		return dateStr;
	}

	/**
	 * 日期转换成字符串
	 * 
	 * @param date
	 * @param format
	 *            "yyyy-MM-dd HH:mm:ss"
	 * @return
	 */
	public static String DateToStr(Date date, String format) {
		SimpleDateFormat sdf = new SimpleDateFormat(format, Locale.CHINA);
		String str = sdf.format(date);
		return str;
	}

	public static String getDay(String time, int index) {
		return time.substring(0, 10).split("-")[index];
	}
}
