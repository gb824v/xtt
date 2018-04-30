package ch.sicap.sisvalidation;

import com.mobilgw.cust.swisscom.sis.*;
import com.mobilgw.cust.swisscom.validation.rules.RulesTemplate;

public class VALIDATE_OK extends RulesTemplate
{

    public VALIDATE_OK()
    {
    }

    public void validation(SubscriberInfo subscriberinfo) throws Exception
    {
        short word0 = subscriberinfo.getBarringState();
        short word1 = subscriberinfo.getActiveScCustomer();
        short word2 = subscriberinfo.getVasBlocked();
        short word3 = subscriberinfo.getVasLimitReached();
        subscriberinfo.setStatus(SubscriberStatus.K_VALID);
        subscriberinfo.setReason(SubscriberStatusReason.OK);
    }

    public String getVersion()
    {
        return "02.02.2007";
    }

    private final short CUSTOMER_NO_SCM = 0;
    private final short CUSTOMER_PREPAID = 1;
    private final short CUSTOMER_POSTPAID = 2;
    private final short CUSTOMER_TELE2 = 3;
    private final short CUSTOMER_TFL = 4;
    private final short CUSTOMER_THOR = 5;
    private final short CUSTOMER_MIGROS_MOBILE = 6;
    private final int BARRING_NO = 0;
    private final int BARRING_CREDIT_LIMIT_REACHED = 1;
    private final int BARRING_COMPLETE = 2;
    private final short VAS_LIMIT_NOT_REACHED = 0;
    private final short VAS_LIMIT_REACHED_SET_BY_SCM = 1;
    private final short VAS_LIMIT_REACHED_SET_BY_CUSTOMER = 2;
    private final short VAS_BLOCKED_NO = 0;
    private final short VAS_BLOCKED_ALL_PREMIUM_CONTENT_BY_SCM = 1;
    private final short VAS_BLOCKED_ALL_PREMIUM_CONTENT_BY_CUSTOMER = 2;
    private final short VAS_BLOCKED_ADULT_CONTENT_BY_SCM = 3;
    private final short VAS_BLOCKED_ADULT_CONTENT_BY_CUSTOMER = 4;
}
