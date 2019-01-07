/*
 * Copyright (C) 2008 feilong
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.cf.utils;

import java.util.Random;


/**
 * 闂呭繑婧�弫鏉夸紣閸忛琚�
 * 
 * <ul>
 * <li>{@link java.lang.Math#random()}鎼存洖鐪版稊鐔告Ц鐠嬪啰鏁ら惃锟絥ew Random(),閸婄》绱砇andom nextDouble()</li>
 * <li>閹讹拷{@link java.util.Random}鐎电钖勬担婊�礋娑擄拷閲滈崗銊ョ湰鐎圭偘绶�static)閺夈儰濞囬悽锟絁ava娑擄拷{@link java.util.Random} 閺勵垳鍤庣粙瀣暔閸忋劎娈�閸愬懘鍎存潻娑滎攽娴滃棗濮為柨浣割槱閻烇拷;</li>
 * <li>娴碱亪娈㈤張鐑樻殶</li>
 * <li>閻㈢喐鍨氶梾蹇旀簚閺佹壆娈戠粻妤佺《閺堝绶㈡径姘鳖潚,閺堬拷鐣濋崡鏇氱瘍閺勵垱娓剁敮鍝ユ暏閻ㄥ嫬姘ㄩ弰锟�缁炬寧锟介崥灞肩稇濞夛拷:缁楃惢+1娑擃亝鏆�(缁楃惢娑擃亝鏆�29+37) % 1000,閸忔湹鑵�閺勶拷濮瑰倷缍戦弫锟芥潻鎰暬缁楋拷</li>
 * </ul>
 *
 * @author <a href="http://feitianbenyue.iteye.com/">feilong</a>
 * @see java.lang.Math#random()
 * @see org.apache.commons.lang3.RandomUtils
 * @see org.apache.commons.lang3.RandomStringUtils
 * @since 1.0.0
 */
public final class RandomUtil{

    /**
     * Random object used by random method.
     * 
     * <p>
     * 娑撹桨绨＄涵顔荤箽閸氬奔绔村В顐ゎ潡娑撳秷鍏樻潻鏂挎礀閻╃鎮撻惃鍕拷,娑撳秴鎮撴竟鐗堟閸︺劍鏌熷▔鏇㈠櫡闂堬拷<br>
     * 閹跺andom鐎电钖勬担婊�礋娑擄拷閲滈崗銊ョ湰鐎圭偘绶�static)閺夈儰濞囬悽锟�Java娑撶挄andom閺勵垳鍤庣粙瀣暔閸忋劎娈�閸愬懘鍎存潻娑滎攽娴滃棗濮為柨浣割槱閻烇拷;
     * </p>
     * 
     * @see org.apache.commons.lang3.RandomUtils
     * @since 1.0.7
     */
    private static final Random JVM_RANDOM = new Random();

    /** Don't let anyone instantiate this class. */
    private RandomUtil(){
        //AssertionError娑撳秵妲歌箛鍛淬�閻拷 娴ｅ棗鐣犻崣顖欎簰闁灝鍘ゆ稉宥呯毈韫囧啫婀猾鑽ゆ畱閸愬懘鍎寸拫鍐暏閺嬪嫰锟介崳锟�娣囨繆鐦夌拠銉ц閸︺劋鎹㈡担鏇熷剰閸愬吀绗呴柈鎴掔瑝娴兼俺顫︾�鐐扮伐閸栵拷
        //see 閵嗗ffective Java閵嗭拷2nd
        throw new AssertionError("No " + getClass().getName() + " instances for you!");
    }

    // ********************************************************************

    /**
     * 閻㈢喐鍨氭稉锟介嚋閹稿洤鐣鹃梹鍨<code>length</code>閻拷<b>闂呭繑婧�锝嗘殻閺侊拷/b>.
     * 
     * <h3>缁�桨绶�</h3>
     * <blockquote>
     * 
     * <pre class="code">
     * RandomUtil.createRandomWithLength(2)
     * 閻㈢喐鍨氶惃鍕波閺嬫粍妲搁崣顖濆厴閺勶拷89
     * </pre>
     * 
     * </blockquote>
     *
     * @param length
     *            鐠佹儳鐣鹃幍锟藉絿閸戞椽娈㈤張鐑樻殶閻ㄥ嫰鏆辨惔锟�
     * @return 婵″倹鐏�<code>length</code> {@code <=0} ,閹舵稑鍤�{@link IllegalArgumentException}
     */
    public static long createRandomWithLength(int length){
        //Validate.isTrue(length > 0, "input param [length] must >0,but is [%s]", length);
        long num = 1;
        for (int i = 0; i < length; ++i){
            num = num * 10;
        }

        // 鐠囥儱锟芥径褌绨粵澶夌艾 0.0 娑撴柨鐨禍锟�.0 濮濓絽褰块惃锟絛ouble 閸婏拷
        double random = JVM_RANDOM.nextDouble();
        random = random < 0.1 ? random + 0.1 : random;// 閸欘垵鍏橀崙铏瑰箛 0.09346924349151808
        return (long) (random * num);
    }

    // ******************************createRandomFromString**********************************
    /**
     * 闂呭繑婧�幎钘夊絿鐎涙顑佹稉锟絚ode>char</code>,閹峰吋甯撮幋鎰瘹鐎规岸鏆辨惔锟絚ode>length</code>閻ㄥ嫬鐡х粭锔胯.
     * 
     * <h3>鐠囧瓨妲�</h3>
     * <blockquote>
     * <ol>
     * <li>鐢摜鏁ゆ禍搴ｆ晸閹存劙鐛欑拠浣虹垳</li>
     * </ol>
     * </blockquote>
     * 
     * <h3>缁�桨绶�</h3>
     * <blockquote>
     * 
     * <pre class="code">
     * RandomUtil.createRandomFromString({@link com.feilong.core.Alphabet#DECIMAL_AND_LETTERS Alphabet.DECIMAL_AND_LETTERS}, 5)
     * 
     * 娴狅拷{@link com.feilong.core.Alphabet#DECIMAL_AND_LETTERS  Alphabet.DECIMAL_AND_LETTERS} 闂呭繑婧�幎钘夊絿鐎涙顑�缂佸嫭鍨氶梹鍨閺勶拷閻ㄥ嫬鐡х粭锔胯
     * 閻㈢喐鍨氶惃鍕波閺嬫粍妲搁崣顖濆厴閺勭枠FSMB
     * </pre>
     * 
     * </blockquote>
     * 
     * @param str
     *            鐞氼偅濞婇崣鏍畱鐎涙顑佹稉锟藉В鏂款洤{@link com.feilong.core.Alphabet#DECIMAL_AND_LETTERS}
     * @param length
     *            閹稿洤鐣剧�妤冾儊娑撴煡鏆辨惔锟藉В鏂款洤 5
     * @return 婵″倹鐏�<code>str</code> 閺勭棴ull,閹舵稑鍤�{@link NullPointerException}<br>
     *         婵″倹鐏�<code>str</code> 閺勭棑lank,閹舵稑鍤�{@link IllegalArgumentException}<br>
     *         婵″倹鐏�<code>length</code> {@code <=0}, 閹舵稑鍤�{@link IllegalArgumentException}
     * 
     * @see org.apache.commons.lang3.RandomStringUtils#random(int, String)
     */

}