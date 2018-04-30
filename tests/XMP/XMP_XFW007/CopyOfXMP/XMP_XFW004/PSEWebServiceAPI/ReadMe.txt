Prerequisites
===========

* XMP v4.1 should be properly configured, up and running.
* XMP v4.1 workflow constants file should be loaded into XMP.
* XMP v4.1 workflow file should be loaded into XMP.



Steps to run PSEWebServiceAPI  test case using XTT.
==========================================

1. Note : Before execute PSEWebServiceAPI test case,  add the following configuration  tag in  your XTT configuration file.
 
   <XMP>
        <Ip>172.21.5.7</Ip>   <!--Enter Machine Ip where XMP is up and running -->
        <Port>9998</Port>    <!--Enter port which is configured in PV file for WebServices--> 
    </XMP>

 2.  Load the  PSEWebServiceAPI.list file into XTT
 3.  Run the List file
